import { useState } from 'react';

export default function Player({initialName, symbol, isActive, onChangeName}) {

    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(initialName);

    function handleEdit() {
        setIsEditing((isEditing) => !isEditing);

        if(isEditing) {
            onChangeName(symbol, name);
        }
    }

    function handleNameChange(event) {
        setName(event.target.value);
    }

    let playerName = <span className="player-name">{name}</span>;
    let buttonName = "Edit";

    if(isEditing) {
        playerName = <input type="text" required value={name} onChange={handleNameChange}/>;
        buttonName = "Save";
    }


    return(
        <li className={isActive ? "active" : undefined}>
            <span className="player">
                {playerName}
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleEdit}>{buttonName}</button>
        </li>
    )
}