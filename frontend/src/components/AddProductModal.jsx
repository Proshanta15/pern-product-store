import {
  DollarSignIcon,
  ImageIcon,
  Package2Icon,
  PlusCircleIcon,
} from "lucide-react";
import { useProductStore } from "../store/useProductStore";

const AddProductModal = () => {
  const { addProduct, formData, setFormData, loading } = useProductStore();
  return (
    <dialog id="add_product_modal" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg mb-8">Add New Product</h3>

        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-4">
            X
          </button>
        </form>

        {/* Create form Component */}
        <form onSubmit={addProduct} className="space-y-6">
          <div className="grid gap-6">
            <div className="form-control">
              <div className="label mb-2">
                <div className="label-text text-base font-medium">
                  Product name
                </div>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content/50">
                  <ImageIcon className="size-5" />
                </div>
                <input
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  type="text"
                  placeholder="Enter product name"
                  className="input input-bordered w-full pl-10 py-3 focus:input-primary transition-colors duration-300"
                />
              </div>
            </div>
            <div className="form-control">
              <div className="label mb-2">
                <div className="label-text text-base font-medium">
                  Product image url
                </div>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 items-center pointer-events-none text-base-content/50">
                  <Package2Icon className="size-5" />
                </div>
                <input
                  value={formData.image}
                  onChange={(e) =>
                    setFormData({ ...formData, image: e.target.value })
                  }
                  type="text"
                  placeholder="Enter product image url"
                  className="input input-bordered w-full pl-10 py-3 focus:input-primary transition-colors duration-300"
                />
              </div>
            </div>
            <div className="form-control">
              <div className="label mb-2">
                <div className="label-text text-base font-medium">
                  Product price
                </div>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 items-center pointer-events-none text-base-content/50">
                  <DollarSignIcon className="size-5" />
                </div>
                <input
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                  type="text"
                  placeholder="Enter product price"
                  className="input input-bordered w-full pl-10 py-3 focus:input-primary transition-colors duration-300"
                />
              </div>
            </div>
          </div>
          {/* Modal Actions */}
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Cancel</button>
            </form>
            <button
              type="submit"
              className="btn btn-primary min-w-[120px]"
              disabled={!formData.name || !formData.image || !formData.price}
            >
              {loading ? (
                <span className="loading loading-spinner loading-sm" />
              ) : (
                <>
                  <PlusCircleIcon className="size-5 mr-2" />
                  Add Produc
                </>
              )}
            </button>
          </div>
        </form>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};

export default AddProductModal;
