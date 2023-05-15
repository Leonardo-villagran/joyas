import { Container } from "react-bootstrap";
import { FcCamera } from "react-icons/fc";

//Vista de datos del home
const Header = () => {
    return (
        <Container className="text-center">
            <div className="jumbotron">
                <h1 className="display-4 font-weight-bold"><FcCamera/>Joyas<FcCamera /></h1>
            </div>
        </Container>
    );
};
export default Header;