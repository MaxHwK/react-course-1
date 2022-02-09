import React from 'react';

import { Variables, Setters, Actions } from '../../form/form';
import './List.css'

type Props = {
    variables: Variables;
    setters: Setters;
    actions: Actions;
}

const ListModal: React.FC<Props> = ({variables, setters, actions}: Props) => {
    return ( <div> <br/> <br/> <br/>
        <form onSubmit={(e) => actions.newList(e)} className='row'>
            <div className="form-floating mb-3 col-12">
                <input type="text" className="form-control" value={variables.listTitle} onChange={(e) => setters.setListTitle(e.target.value)} id="list" placeholder="Title of your list" />
                <label htmlFor="list">Title of your list</label>
            </div>

            <div className="form-floating mb-3 col-3 btn-right">
                <input type="submit" className="btn btn-primary w-100 h-100" value="Create" />
            </div>
        </form>
    </div>
    );
};

export default ListModal;
