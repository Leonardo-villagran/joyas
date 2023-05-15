import { Container } from "react-bootstrap";
import { RiShoppingBagFill } from "react-icons/ri";

//Vista de datos del home
const Header = () => {
    return (
        <Container className="text-center">
            <div className="jumbotron">
                <h1 className="display-4 font-weight-bold"><RiShoppingBagFill/>Joyas<RiShoppingBagFill /></h1>
            </div>
        </Container>
    );
};
export default Header;