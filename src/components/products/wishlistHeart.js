const WishlistHeart =({

    addToWishlist,
    product,
    wishlist
})=>{
    

    const renderWishlistHeart = () => {
        let selected = false;

        if (
            wishlist &&
            wishlist !== null &&
            wishlist !== undefined &&
            product &&
            product !== null && 
            product !== undefined
        ) {
            wishlist.map(item => {
                if (item.product.id.toString() === product.id.toString()) {
                    selected = true;
                }
            });
        }
    
        if (selected) {
            return (
                <button
                onClick={() => addToWishlist(true)}
                className="ml-2 p-1.5 rounded-md flex items-center justify-center text-red-500 hover:text-red-600 transition-colors duration-150">
                    <svg className="h-5 w-5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    <span className="sr-only">Quitar de favoritos</span>
                </button>
            )
        } else {
            return (
                <button
                onClick={() => addToWishlist(false)}
                className="ml-2 p-1.5 rounded-md flex items-center justify-center text-sofi-300 hover:text-red-400 transition-colors duration-150">
                    <svg className="h-5 w-5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    <span className="sr-only">Agregar a favoritos</span>
                </button>
            )
        }
    }

    return(
        <>
        {renderWishlistHeart()}
        </>
    )
}

export default WishlistHeart