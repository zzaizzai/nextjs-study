import { age, name } from './data.js'

export default function List() {

    let name = 'park'

    let merchandise = ['tomatos', 'pasta', 'coconut']


    return (
        <div>
            <h4>안녕 {name}</h4>
            {age}

            <CartItem data={merchandise[1]} />
            {
                merchandise.map((a, i) => {
                    return (
                        <div key={i}>
                            <CartItem data={merchandise[i]} />
                        </div>
                    )
                })
            }
        </div>
    )
}


function CartItem(props) {
    return (
        <div className="">
            <p>상품명: {props.data}</p>

        </div>
    )

}