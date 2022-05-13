const Shop = () => {
    const dispatch = useDispatch()
    const productArr = useSelector(state => state.products)
    const categoriesArr = useSelector(state => state.categories)

    const [currentCategory, setCurrentCategory] = useState('')

    useEffect(() => {
        dispatch(setProductThunk(currentCategory))
        dispatch(setCategoriesThunk())
    }, [dispatch, currentCategory])

    const list = productArr.map((item) => <productItem key={item.id} prodObj={item}/>)
    const categoriesList = categoriesArr.map(item => <button key={item.id} onClick={() => setCurrentCategory(item.id)}>{item.name}</button>)

    return(
        <div>
            <h1>Esta es mi tienda</h1>
            <button onClick={() => setCurrentCategory('')}>All Products</button>
        </div>
    )
}

export default Shop