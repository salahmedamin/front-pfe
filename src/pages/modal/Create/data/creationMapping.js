import { categorieService } from "../../../../services/categorie.service";
import { marqueService } from "../../../../services/marque.service";
import { productService } from "../../../../services/produit.service";

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
        validate: (v) => v.length > 5,
        errorMessage: "Brand name must be longer than 5 letters",
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
          return v.nom.value.length > 5;
        },
      },
    ],
    update: {},
  },
};
