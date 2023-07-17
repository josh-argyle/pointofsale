function ExitButton( {onRequestClose}) {

    return (
        <button className="exit-button-button" onClick={onRequestClose}>
            <img src="./circle-xmark-regular.svg" alt="Exit button" className="exit-button-image" />
        </button>
    );
}

export default ExitButton;