import React from 'react';

import { Setters } from '../../form/form';
import './Sort.css'

type Props = {
  setters: Setters;
}

const SortComponent: React.FC<Props> = ({setters}: Props) => {
    return (
        <div className='d-flex justify-content-center sort-by-tasks'>
            <div className="input-group">
                <label className="input-group-text bg-dark text-white">Sort by</label>

                <select name="sort" id="sort" className="form-select w-50 max-w" onChange={(e) => {setters.setSort(e.target.value)}}>
                    <option value="">all the tasks</option>
                    <option value="pinned">only pinned tasks</option>
                    <option value="nonpinned">only non pinned tasks</option>
                </select>
            </div>
        </div>
    );
};

export default SortComponent;