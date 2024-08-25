import React, { useState, useEffect } from 'react';
import data from '../data/taladrod-cars.json';
import { Link } from 'react-router-dom';
import { saveToLocalStorage, getFromLocalStorage } from '../utils/localStorage';

const CarItem = ({ car, toggleHighlight, isHighlighted }) => (
    <div key={car.Cid} className={`grid-item ${isHighlighted ? 'highlighted' : ''}`}>
        <h3>{car.NameMMT.split(' ')[0]}</h3>
        <img src={car.Img300} alt={car.Model} className="car-image" />
        <h4>{car.NameMMT}</h4>
        <p>Price: {car.Prc} {car.Currency}</p>
        <p>Province: {car.Province}</p>
        <p>Year: {car.Yr}</p>
        <p>PageViews: {car.PageViews}</p>
        <button onClick={() => toggleHighlight(car)}>
            {isHighlighted ? 'Remove from Highlight' : 'Add to Highlight'}
        </button>
    </div>
);

const HighlightedCars = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedBrand, setSelectedBrand] = useState('All');
    const [highlightedCars, setHighlightedCars] = useState([]);

    // Load highlighted cars from localStorage on initial render
    useEffect(() => {
        const savedHighlightedCars = getFromLocalStorage('highlightedCars');
        if (savedHighlightedCars && savedHighlightedCars.length > 0) {
            setHighlightedCars(savedHighlightedCars);
        }
    }, []);

    // Save highlighted cars to localStorage whenever it changes
    useEffect(() => {
        saveToLocalStorage('highlightedCars', highlightedCars);
    }, [highlightedCars]);

    const toggleHighlight = (car) => {
        setHighlightedCars((prevHighlightedCars) => {
            const isHighlighted = prevHighlightedCars.some(
                (highlightedCar) => highlightedCar.Cid === car.Cid
            );
            if (isHighlighted) {
                // Remove car from highlightedCars
                return prevHighlightedCars.filter(
                    (highlightedCar) => highlightedCar.Cid !== car.Cid
                );
            } else {
                // Add car to highlightedCars
                return [...prevHighlightedCars, car];
            }
        });
    };

    const brands = ['All', ...new Set(data.Cars.map(car => car.NameMMT.split(' ')[0]))];

    const filteredData = data.Cars.filter(car =>
        (car.NameMMT.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.Model.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (selectedBrand === 'All' || car.NameMMT.split(' ')[0] === selectedBrand)
    );

    return (
        <div className="highlighted-cars">
            <nav>
                <Link to="/">Dashboard</Link>
                <Link to="/highlighted">Highlighted Cars</Link>
            </nav>
            <div className="grid-container">
                {highlightedCars.map(car => (
                    <CarItem
                        key={car.Cid}
                        car={car}
                        toggleHighlight={toggleHighlight}
                        isHighlighted={true}
                    />
                ))}
            </div>

            <input
                type="text"
                placeholder="Search by name or model"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <nav>
                {brands.map(brand => (
                    <button
                        key={brand}
                        onClick={() => setSelectedBrand(brand)}
                        className={selectedBrand === brand ? 'selected' : ''}
                    >
                        {brand}
                    </button>
                ))}
            </nav>
            <div className="grid-container">
                {filteredData.map(car => (
                    <CarItem
                        key={car.Cid}
                        car={car}
                        toggleHighlight={toggleHighlight}
                        isHighlighted={highlightedCars.some(
                            highlightedCar => highlightedCar.Cid === car.Cid
                        )}
                    />
                ))}
            </div>
        </div>
    );
};

export default HighlightedCars;
