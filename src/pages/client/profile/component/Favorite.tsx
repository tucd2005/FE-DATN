import React from 'react'
import { useProductsClient } from '../../../../hooks/useProductsClient';

type Props = {}

const Favorite = (props: Props) => {

      const { data, isLoading, error } = useProductsClient(filterParams);
    

    return (
        <div>Favorite</div>
    )
}

export default Favorite