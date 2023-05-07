import { CloseOutlined } from "@ant-design/icons";
import {
  Button,
  CircularProgress,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { dispatch } from "../../../store";
import { addEntity, updateEntity } from "../../../store/reducers/entities";
import { hideModal } from "../../../store/reducers/modal";
import { addSnackbar } from "../../../store/reducers/snackbar";
import { creationMapping } from "./data/creationMapping";
export const ModalCreateOrUpdate = ({
  entity,
  isUpdating = false,
  id = undefined,
}) => {
  // console.log(entity);
  //extract creation or update data from custom json
  const creationMappingEntity = useMemo(
    () => creationMapping[entity]?.fields,
    [entity]
  );
  const updateMappingEntity = useMemo(
    () => creationMapping[entity]?.update,
    [entity]
  );
  //extracted values and loading state
  const [values, setvalues] = useState(
    creationMappingEntity?.reduce(
      (tot, next) =>
        (tot = {
          ...tot,
          [next.name]: {
            value: next.init, //text | number
            searchText: "", //array
            search: [], //array
            dirty: false, //text | number
            error: false, //all
            loading: false, //array
            showValues: false, //array
          },
        }),
      {}
    )
  );
  const [loading, setloading] = useState(false);

  //to minimize extraction code, reusable functions will do the trick
  //update a field in nested values object
  const updateField = useCallback(
    (field, data) =>
      setvalues((prv) => ({
        ...prv,
        [field]: {
          ...prv[field],
          ...data,
        },
      })),
    [setvalues]
  );
  //get a field value in nested values object
  const getFieldProp = useCallback(
    (field, prop) => {
      return values[field][prop];
    },
    [values]
  );
  //get all field
  const getField = useCallback(
    (field) => {
      return values[field];
    },
    [values]
  );
  //if updating, assign values to state from returned backend response
  const createInitialValuesToUpdate = useCallback(async () => {
    try {
      setloading(true);
      const single = await updateMappingEntity.getInit({ id });
      for (const prop of Object.keys(single)) {
        const field = getField(prop);
        if (!!field) {
          updateField(prop, {
            value:
              !!updateMappingEntity.formatField &&
              typeof updateMappingEntity.formatField[prop] === "function"
                ? updateMappingEntity.formatField[prop](single[prop])
                : single[prop],
          });
        }
      }
      setloading(false);
      // console.log(values);
    } catch (error) {
      console.log(error);
      dispatch(hideModal());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateField, updateMappingEntity, id]);
  //can our user submit this form ??
  const canSubmit = useMemo(() => {
    return creationMappingEntity
      ?.find((e) => e.type === "submit")
      .validate(values);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values]);

  useEffect(() => {
    //if user is updating, do so else do none
    if (!isUpdating) return;
    (async () => await createInitialValuesToUpdate())();
  }, [isUpdating, createInitialValuesToUpdate]);

  return loading ? (
    <Stack
      alignItems={"center"}
      justifyContent="center"
      padding={4}
      width={"100%"}
    >
      <CircularProgress size={40} variant="indeterminate" />
    </Stack>
  ) : (
    <Stack width="100%" alignItems="flex-start" gap={2}>
      {(creationMappingEntity || []).map((e, i) =>
        e.type === "submit" ? (
          <Button
            key={i}
            disabled={!canSubmit}
            onClick={async () => {
              let data;
              if (!canSubmit) console.log("Please re-check ur input");
              else {
                if (isUpdating) {
                  data = await updateMappingEntity.submit(values, id, () =>
                    dispatch(hideModal())
                  );
                } else {
                  data = await e.submit(values, () => dispatch(hideModal()));
                }
                if (data) {
                  dispatch(
                    addSnackbar({
                      snackbar: {
                        type: "success",
                        message: `${
                          isUpdating ? "Updated" : "Created"
                        } successfully`,
                        id: Math.random() * Date.now(),
                      },
                    })
                  );
                  if (isUpdating)
                    dispatch(
                      updateEntity({
                        entity,
                        id,
                        data,
                      })
                    );
                  else
                    dispatch(
                      addEntity({
                        entity,
                        data,
                      })
                    );
                }
              }
            }}
            color="primary"
            variant="outlined"
            size="large"
          >
            {isUpdating ? updateMappingEntity.submitLabel : e.label}
          </Button>
        ) : ["text", "number"].includes(e.type) ? (
          <Stack width="100%" gap={0.25} key={i}>
            <TextField
              fullWidth
              label={e.label}
              type={e.type}
              value={getFieldProp(e.name, "value")}
              onFocus={() =>
                updateField(e.name, {
                  dirty: true,
                })
              }
              onBlur={(ev) =>
                updateField(e.name, {
                  error: !e.validate(ev.target.value),
                })
              }
              onChange={(ev) => {
                //change value on input
                updateField(e.name, {
                  value: parseInt(ev.target.value) || ev.target.value || e.init,
                });
              }}
            />
            {getFieldProp(e.name, "dirty") && getFieldProp(e.name, "error") ? (
              <Typography fontSize={11} color="firebrick">
                {e.errorMessage}
              </Typography>
            ) : null}
          </Stack>
        ) : (
          //if array :)
          <Stack width={"100%"} gap={1} key={i}>
            <Stack width="100%" gap={0.25}>
              <TextField
                type="text"
                label={e.label}
                value={getFieldProp(e.name, "searchText")}
                onChange={async (ev) => {
                  updateField(e.name, { searchText: ev.target.value });
                  if (!e.validate(ev.target.value)) {
                    updateField(e.name, { search: [] });
                    return;
                  }
                  updateField(e.name, { loading: true });
                  const data = await e.searchCallback(ev.target.value);
                  updateField(e.name, { search: data, loading: false });
                }}
                InputProps={{
                  endAdornment:
                    !getFieldProp(e.name, "loading") &&
                    !getFieldProp(e.name, "value").length ? null : (
                      <InputAdornment position="end">
                        {getFieldProp(e.name, "loading") ? (
                          <CircularProgress variant="indeterminate" size={15} />
                        ) : (
                          <Button
                            variant="contained"
                            size="small"
                            color="success"
                            onClick={() =>
                              updateField(e.name, {
                                showValues: !getFieldProp(e.name, "showValues"),
                              })
                            }
                          >
                            {getFieldProp(e.name, "value").length}
                          </Button>
                        )}
                      </InputAdornment>
                    ),
                }}
              />
            </Stack>
            <Stack direction={"row"} flexWrap="wrap" width={"100%"} gap={1}>
              {values[e.name][
                getFieldProp(e.name, "showValues") ? "value" : "search"
              ]?.map((vv, ii) =>
                getFieldProp(e.name, "value")?.find(
                  (record) => record.id === vv.id
                ) && !getFieldProp(e.name, "showValues") ? null : (
                  <Button
                    variant="contained"
                    color={
                      getFieldProp(e.name, "showValues") ? "success" : "primary"
                    }
                    key={ii}
                    onClick={() => {
                      if (!getFieldProp(e.name, "showValues"))
                        updateField(e.name, {
                          value: e.multiple
                            ? [...getFieldProp(e.name, "value"), vv]
                            : [vv],
                          // search: [],
                          // searchText: "",
                        });
                      else
                        updateField(e.name, {
                          value: getFieldProp(e.name, "value").filter(
                            (rc) => rc.id !== vv.id
                          ),
                          showValues:
                            getFieldProp(e.name, "value").length - 1 === 0
                              ? false
                              : getFieldProp(e.name, "showValues"),
                        });
                    }}
                  >
                    {getFieldProp(e.name, "showValues") ? (
                      <CloseOutlined style={{ marginRight: 5 }} />
                    ) : null}
                    {vv[e.searchValue]}
                  </Button>
                )
              )}
            </Stack>
          </Stack>
        )
      )}
    </Stack>
  );
};
