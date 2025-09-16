
export default async function DetailProducts({
    params
}:{
    params: Promise<{id:number}>
}){
    const { id } = await params
    return(
        
        <h1>TESTE</h1>
    )
}