import { Button, Stack, TextField } from "@mui/material";
import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { demande_restockService } from "../../services/demande_restock.service";
import { tacheService } from "../../services/tache.service";

function RequestProduct({ id }) {
  const [quantite, setquantite] = useState(0);
  const { quantite: reduxQnt, quantiteEnTachesEnCours } = useSelector((e) =>
    e.entities.produit.data.find((e) => e.id === id)
  );
  const canSubmit = useMemo(
    () => quantite > 0 && reduxQnt - (quantiteEnTachesEnCours + quantite) >= 0,
    [quantite, reduxQnt, quantiteEnTachesEnCours]
  );
  return (
    <Stack
      width="100%"
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      gap={1}
    >
      <TextField
        onChange={(e) => setquantite(parseInt(e.target.value) || 0)}
        value={quantite}
        type={"number"}
        label={"Quantity"}
        variant="outlined"
      />
      <Button
        // disabled={!canSubmit}
        size="large"
        variant="outlined"
        onClick={async () =>
          !canSubmit ? await demande_restockService.createDemandeRestock({produit: id,quantite}) : await tacheService.createTask(id, quantite)
        }
      >
        Confirm
      </Button>
    </Stack>
  );
}

export default RequestProduct;
