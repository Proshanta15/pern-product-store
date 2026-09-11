
export const ProductCard = ({ product }) => {
    return (
        <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <figure className="relative pt-[56.25%]">
                <img src={product.image} alt={product.name} />
            </figure>
            <div className="card-body">
                <h2 className="card-title text-lg font-semibold">{product.name}</h2>
                <p className="text-2xl font-bold text-primary">${Number(product.price).toFixed(2)}</p>
            </div>
        </div>
    )
}
