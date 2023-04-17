import { Grid } from "@mui/material";
import { useMemo } from "react";
import { useParams } from "react-router";
import MainCard from "../../components/MainCard";
import { NotFound } from "../../components/NotFound";
import { OrdersTable } from "../dashboard/OrdersTable";

export const ManageEntity = ({ entity }) => {
  //   const { user } = useSelector((e) => e.auth);
  const { entity: paramEntity } = useParams();
  const entities = useMemo(
    () => [
      "produit",
      "categorie",
      "tache",
      "user",
      "facture",
      "fournisseur",
      "equipe",
      "marque",
      "demande_restock"
    ],
    []
  );
  
  return (
    <Grid item xs={12} md={7} lg={8}>
      {!entities.includes(
        entity || paramEntity.slice(0, paramEntity.length - 1)
      ) ? (
        <NotFound />
      ) : (
        <MainCard sx={{ mt: 2 }} content={false}>
          <OrdersTable
            entity={entity || paramEntity.slice(0, paramEntity.length - 1)}
          />
        </MainCard>
      )}
    </Grid>
  );
};
