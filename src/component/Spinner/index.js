import React from 'react';

const Spinner = () => {
    return (
        <div className="spinner-border text-info d-flex m-auto" role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
    );
};

export default Spinner;