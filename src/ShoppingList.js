const product = [
    { title: 'Cabbage', isFruit: false, id:1 },
    { title: 'Garlic', isFruit: false, id:2 },
    { title: 'Apple', isFruit: true, id:3 },
]

export default function ShoppingList() {

    const listItems = product.map(product =>
        <li key={product.id}       style={{
            color: product.isFruit ? 'magenta' : 'darkgreen'
          }}
    >{product.title}</li>);
    
    return(
        <div style={{textAlign: 'center'}}>
            <ul style={{ display: 'inline-block', margin: 0, padding: 0 }}
            >{listItems}</ul>
        </div>
    )
    
}