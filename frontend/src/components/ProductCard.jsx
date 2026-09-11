import { EditIcon, TrashIcon } from "lucide-react";
import { Link } from 'react-router-dom';

export const ProductCard = ({ product }) => {
    return (
        <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300">

            <img className=" w-full h-full object-cover" src={product.image} alt={product.name} />

            <div className="card-body">
                <h2 className="card-title text-lg font-semibold">{product.name}</h2>
                <p className="text-2xl font-bold text-primary">${Number(product.price).toFixed(2)}</p>

                <div className="card-actions justify-end mt-4">
                    <Link to={`/product/${product.id}`} className="btn btn-sm btn-info btn-outline">
                        <EditIcon className="size-4" />
                    </Link>
                    <button className="btn btn-sm btn-error btn-outline">
                        <TrashIcon className="size-4" />
                    </button>
                </div>
            </div>
        </div>
    )
}
