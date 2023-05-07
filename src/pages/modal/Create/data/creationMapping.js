import { categorieService } from "../../../../services/categorie.service";
import { equipeService } from "../../../../services/equipe.service";
import { factureService } from "../../../../services/facture.service";
import { fournisseurService } from "../../../../services/fournisseur.service";
import { marqueService } from "../../../../services/marque.service";
import { productService } from "../../../../services/produit.service";
import { userService } from "../../../../services/user.service";

export const creationMapping = {
  produit: {
    fields: [
      {
        label: "Product name",
        name: "nom",
        type: "text",
        init: "",
        validate: (v) => v.length > 5,
        errorMessage: "Product name must be longer than 5 letters",
      },
      {
        label: "Quantity",
        name: "quantite",
        type: "number",
        init: 0,
        validate: (v) => v > 0,
        errorMessage: "Quantity cannot be null",
      },
      {
        label: "Select Brand",
        name: "marque",
        type: "array",
        validate: (v) => v.length > 0,
        init: [],
        searchCallback: async (nom) => {
          const res = await marqueService.paginateMarquesList(0, { nom }, true);
          return res;
        },
        searchValue: "nom",
      },
      {
        label: "Search categories",
        name: "categories",
        multiple: true,
        type: "array",
        validate: (v) => v.length > 0,
        init: [],
        searchCallback: async (nom) => {
          const res = await categorieService.paginateCategoriesList(
            0,
            { nom },
            true
          );
          return res;
        },
        searchValue: "nom",
      },
      {
        label: "Create product",
        name: "submit",
        type: "submit",
        submit: async (v, cb = undefined) => {
          const { marque, nom, quantite, categories } = v;
          const data = await productService.createProduct({
            marque: marque.value[0].id,
            nom: nom.value,
            quantite: quantite.value,
            categories: categories.value.map((e) => e.id),
          });
          if (typeof cb === "function") await cb();
          return data;
        },
        validate: (v) => {
          return (
            v.quantite.value > 0 &&
            v.nom.value.length > 5 &&
            v.marque.value.length === 1
          );
        },
      },
    ],
    update: {
      submitLabel: "Update product",
      getInit: async ({ id }) => {
        return await productService.getProduct({ id });
      },
      formatField: {
        marque: (v) => [v],
      },
      submit: async (values, id, cb) => {
        const { marque, nom, quantite, categories, images } = values;
        const data = await productService.updateProduct({
          id,
          marque: marque.value[0].id,
          nom: nom.value,
          quantite: quantite.value,
          categories: categories.value.map((e) => e.id),
          images: images ? images.value : [],
        });
        if (typeof cb === "function") await cb();
        return data;
      },
    },
  },
  marque: {
    fields: [
      {
        label: "Brand's name",
        name: "nom",
        type: "text",
        init: "",
        validate: (v) => v.length > 3,
        errorMessage: "Brand name must be longer than 3 letters",
      },
      {
        label: "Create brand",
        name: "submit",
        type: "submit",
        submit: async (v, cb = undefined) => {
          const { nom } = v;
          const data = await marqueService.createMarque({
            nom: nom.value,
          });
          if (typeof cb === "function") await cb();
          return data;
        },
        validate: (v) => {
          return v.nom.value.length > 3;
        },
      },
    ],
    update: {
      submitLabel: "Update Brand",
      getInit: async ({ id }) => {
        return await marqueService.getMarque({ id });
      },
      submit: async (values, id, cb) => {
        const { nom } = values;
        const data = await marqueService.updateMarque({
          id,
          nom: nom.value,
        });
        if (typeof cb === "function") await cb();
        return data;
      },
    },
  },
  categorie: {
    fields: [
      {
        label: "Categorie's name",
        name: "nom",
        type: "text",
        init: "",
        validate: (v) => v.length > 3,
        errorMessage: "Categorie's name must be longer than 3 letters",
      },
      {
        label: "Create categorie",
        name: "submit",
        type: "submit",
        submit: async (v, cb = undefined) => {
          const { nom } = v;
          const data = await categorieService.createCategorie({
            nom: nom.value,
          });
          if (typeof cb === "function") await cb();
          return data;
        },
        validate: (v) => {
          return v.nom.value.length > 3;
        },
      },
    ],
    update: {
      submitLabel: "Update Categorie",
      getInit: async ({ id }) => {
        return await categorieService.getCategorie({ id });
      },
      submit: async (values, id, cb) => {
        const { nom } = values;
        const data = await categorieService.updateCategorie({
          id,
          nom: nom.value,
        });
        if (typeof cb === "function") await cb();
        return data;
      },
    },
  },
  equipe: {
    fields: [
      {
        label: "Team's name",
        name: "nom",
        type: "text",
        init: "",
        validate: (v) => v.length > 2,
        errorMessage: "Team's name must be longer than 2 letters",
      },
      {
        label: "Create team",
        name: "submit",
        type: "submit",
        submit: async (v, cb = undefined) => {
          const { nom } = v;
          const data = await equipeService.createEquipe({
            nom: nom.value,
          });
          if (typeof cb === "function") await cb();
          return data;
        },
        validate: (v) => {
          return v.nom.value.length > 2;
        },
      },
    ],
    update: {
      submitLabel: "Update Team",
      getInit: async ({ id }) => {
        return await equipeService.getEquipe({ id });
      },
      submit: async (values, id, cb) => {
        const { nom } = values;
        const data = await equipeService.updateEquipe({
          id,
          nom: nom.value,
        });
        if (typeof cb === "function") await cb();
        return data;
      },
    },
  },
  user: {
    fields: [
      {
        label: "First name",
        name: "nom",
        type: "text",
        init: "",
        validate: (v) => v.length > 2,
        errorMessage: "First name's length must be superior to 2 letters",
      },
      {
        label: "Last name",
        name: "prenom",
        type: "text",
        init: "",
        validate: (v) => v.length > 2,
        errorMessage: "Last name's length must be superior to 2 letters",
      },
      {
        label: "Trigramme",
        name: "trigramme",
        type: "text",
        init: "",
        validate: (v) => v.length > 2,
        errorMessage: "Trigramme's length must be superior to 2",
      },
      {
        label: "Select Team",
        name: "equipe",
        type: "array",
        validate: (v) => v.length > 0,
        init: [],
        searchCallback: async (nom) => {
          const res = await equipeService.paginateEquipeList(0, { nom }, true);
          return res;
        },
        searchValue: "nom",
      },
      {
        label: "Create user",
        name: "submit",
        type: "submit",
        submit: async (v, cb = undefined) => {
          const { equipe, nom, prenom, trigramme } = v;
          const data = await userService.createUser({
            equipe: equipe.value[0].id,
            nom: nom.value,
            prenom: prenom.value,
            trigramme: trigramme.value,
          });
          if (typeof cb === "function") await cb();
          return data;
        },
        validate: (v) => {
          return (
            v.nom.value.length > 2 &&
            v.prenom.value.length > 2 &&
            v.equipe.value.length === 1
          );
        },
      },
    ],
    update: {
      submitLabel: "Update product",
      getInit: async ({ id }) => {
        return await userService.getUser({ id });
      },
      formatField: {
        equipe: (v) => [v],
      },
      submit: async (values, id, cb) => {
        const { equipe, nom, prenom, trigramme } = values;
        const data = await userService.updateUser({
          id,
          equipe: equipe.value[0].id,
          nom: nom.value,
          prenom: prenom.value,
          trigramme: trigramme.value,
        });
        if (typeof cb === "function") await cb();
        return data;
      },
    },
  },
  fournisseur: {
    fields: [
      {
        label: "Supplier's Name",
        name: "nom",
        type: "text",
        init: "",
        validate: (v) => v.length > 2,
        errorMessage: "Supplier's name's length must be longer than 2 letters",
      },
      {
        label: "Create supplier",
        name: "submit",
        type: "submit",
        submit: async (v, cb = undefined) => {
          const { nom } = v;
          const data = await fournisseurService.createFournisseur({
            nom: nom.value,
          });
          if (typeof cb === "function") await cb();
          return data;
        },
        validate: (v) => {
          return v.nom.value.length > 2;
        },
      },
    ],
    update: {
      submitLabel: "Update Supplier",
      getInit: async ({ id }) => {
        return await fournisseurService.getFournisseur({ id });
      },
      submit: async (values, id, cb) => {
        const { nom } = values;
        const data = await fournisseurService.updateFournisseur({
          id,
          nom: nom.value,
        });
        if (typeof cb === "function") await cb();
        return data;
      },
    },
  },
  facture: {
    fields: [
      {
        label: "Amount ($)",
        name: "montant",
        type: "number",
        init: 0,
        validate: (v) => v > 0,
        errorMessage: "Amount cannot be null",
      },
      {
        label: "Supplier",
        name: "fournisseur",
        type: "array",
        validate: (v) => v.length > 0,
        init: [],
        searchCallback: async (nom) => {
          const res = await fournisseurService.paginateFournisseursList(0, { nom }, true);
          return res;
        },
        searchValue: "nom",
      },
      {
        label: "Create invoice",
        name: "submit",
        type: "submit",
        submit: async (v, cb = undefined) => {
          const { fournisseur, montant } = v;
          const data = await factureService.createFacture({
            fournisseur: fournisseur.value.at(0).id,
            montant: montant.value,
          });
          if (typeof cb === "function") await cb();
          return data;
        },
        validate: (v) => {
          return v.montant.value > 0 && v.fournisseur.value.length === 1;
        },
      },
    ],
  },
};
