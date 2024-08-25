import React, { useState } from 'react';

const CarTable = ({ data }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredData = data.filter(car => 
        car.NameMMT.toLowerCase().includes(searchTerm.toLowerCase()) || 
        car.Model.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const brandModelCount = filteredData.reduce((acc, car) => {
        const brand = car.NameMMT.split(' ')[0];
        const model = car.Model;
        if (!acc[brand]) acc[brand] = { total: 0, models: {} };
        acc[brand].total += 1;
        if (!acc[brand].models[model]) acc[brand].models[model] = 0;
        acc[brand].models[model] += 1;
        return acc;
    }, {});

    return (
        <div>
            <input 
                type="text" 
                placeholder="Search by name or model" 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)} 
            />
            <table>
                <thead>
                    <tr>
                        <th>Brand</th>
                        <th>Model</th>
                        <th>Count</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(brandModelCount).map(brand => (
                        <React.Fragment key={brand}>
                            <tr>
                                <td>{brand}</td>
                                <td colSpan="3">{brandModelCount[brand].total}</td>
                            </tr>
                            {Object.keys(brandModelCount[brand].models).map(model => (
                                <tr key={model}>
                                    <td></td>
                                    <td>{model}</td>
                                    <td>{brandModelCount[brand].models[model]}</td>
                                    <td>{data.find(car => car.Model === model && car.NameMMT.split(' ')[0] === brand).Prc} Baht</td>
                                </tr>
                            ))}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CarTable;