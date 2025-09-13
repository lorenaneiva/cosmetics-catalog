import { Product } from "../../components/product"
import styles from './product.module.css';
import { ProductProps } from "../../components/product"
import React, { useState } from 'react';

const API = process.env.NEXT_PUBLIC_API!;

export default async function DetailProduct({ params }: {params: Promise< {id: string}>}){
    const { id } = await params
    const res = await fetch (`${API}/products/${id}`, )
    const data: ProductProps = await res.json()


    return (
        <div className={styles.main}>
            
            {/*<div className={styles.generalslide}>
               

                <ul className={styles.slider}>
                    {(data.images ?? []).map((img)=>
                    ( (
                    
                        <li key={img.id} >
                        <img src={img.image} width={120}/>
                        </li> )
                        
                ))}
                </ul></div>*/}

            <div>

                <h1>{data.name}</h1>
                
                <h2>R$ {data.price}</h2>
                
                <p>Descrição: {data.description}</p>

                <p>Entre em contato: <a href=" https://wa.me/91987615365/?text=Oi!%20Eu%20gostaria%20de%20mais%20informações%20sobre%20um%20produto,%20por%20favor." rel='external' target="_blank">WhatsApp</a></p>
                
                <Product/>
                
            </div>
            
        </div>
    )

}