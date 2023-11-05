import React from 'react';

const FilterCategory = ({ filter, setFilter }) => {
    return (
        <div className="filter-buttons">
            <button
                onClick={() => setFilter("All")}
                className={filter === "All" ? "active" : ""}
            >
                All
            </button>
            <button
                onClick={() => setFilter("DPS")}
                className={filter === "DPS" ? "active" : ""}
            >
                DPS
            </button>
            <button
                onClick={() => setFilter("TANK")}
                className={filter === "TANK" ? "active" : ""}
            >
                TANK
            </button>
            <button
                onClick={() => setFilter("HEALER")}
                className={filter === "HEALER" ? "active" : ""}
            >
                HEALER
            </button>
        </div>
    );
}

export default FilterCategory;