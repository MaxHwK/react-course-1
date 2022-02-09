import { BsListUl } from 'react-icons/bs';
import { BsPlusCircle } from 'react-icons/bs';

import { Variables, Actions } from '../../form/form';
import './Navbar.css'

type Props = {
    variables: Variables;
    actions: Actions;
}

const NavbarComponent = ({variables, actions}: Props) => {
    return (
        <header>
            <nav className="p-3 navbar navbar-expand-lg navbar-dark bg-dark">
                <a className="navbar-brand" href="#"><h4>React Course 1 - To Do List</h4></a>

                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                {variables.lists.length !== 0 ? <form className="form-inline">
                    <button className="btn btn-primary" type="button" onClick={actions.listModal}>Create a new List <BsListUl/></button>
                    <button className="btn btn-light" type="button" onClick={actions.taskModal}>Create a new Task <BsPlusCircle/></button>
                </form> : null }
            </nav>
        </header>
    );
};

export default NavbarComponent;
