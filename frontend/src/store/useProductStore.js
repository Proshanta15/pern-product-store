import axios from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";

const BASE_URL = "http://localhost:3000";

export const useProductStore = create((set, get) => ({
  // products state
  products: [],
  loading: false,
  error: null,

  fetchProducts: async () => {
    set({ loading: true });
    try {
      const response = await axios.get(`${BASE_URL}/api/products`);
      set({ products: response.data.data, error: null });
    } catch (err) {
      if (err.status == 429)
        set({ error: "Rate limit exceeded", products: [] });
      else set({ error: "Something went wrong", products: [] });
    } finally {
      set({ loading: false });
    }
  },
  // Add product
  formData: {
    name:"",
    image:"",
    price:""
  },

  setFormData: (formData) => set({formData}),
  resetForm: () => set({formData: {name:"", image:"", price: ""}}),

  addProduct: async (e) => {
    e.preventDefault();
    set({loading: true});

    try {
      const {formData} = get()
      await axios.post(`${BASE_URL}/api/products`, formData);
      await get().fetchProducts();
      get().resetForm();
      toast.success("Product added Successfully");
      // Add product Close modal
      document.getElementById('add_product_modal').close();
    } catch (error) {
      console.log("Products Not added", error);
      toast.error("Something went wrong");
    } finally{
      set({loading: false});
    }
  },


  deleteProduct: async (id) =>{
    set({loading: true});
    try {
      await axios.delete(`${BASE_URL}/api/products/${id}`);
      set(prev => ({products: prev.products.filter(product => product.id !== id)}));
      toast.success("Product deleted successfully");
    } catch (error) {
      console.log("Error in delete Product ", error);
      toast.error("Error in delete Product")
    } finally{
      set({loading: false})
    }
  }
}));
