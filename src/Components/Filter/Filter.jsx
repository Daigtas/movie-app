import React, { useEffect, useState } from 'react';
import { fetchMovieGenres, fetchTVGenres } from '../../utils/api';
import './Filter.css';

const Filter = ({ onFilterChange, type = 'movie', initialFilters }) => {
    const [filters, setFilters] = useState(initialFilters || {
        year: 'all',
        genre: 'all',
    });
    
    const [genres, setGenres] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isExpanded, setIsExpanded] = useState(false);
    
    // Replace useState with a constant since we don't need to update yearRange
    const yearRange = {
        min: new Date().getFullYear() - 50,
        max: new Date().getFullYear()
    };

    const getFilterLabel = () => {
        return type === 'movie' ? 'Release Year' : 'First Air Date';
    };

    const getFilterTitle = () => {
        return type === 'movie' ? 'Movies' : 'TV Shows';
    };
    
    useEffect(() => {
        const fetchGenres = async () => {
            try {
                setLoading(true);
                const genresData = await (type === 'movie' ? fetchMovieGenres() : fetchTVGenres());
                setGenres(genresData);
            } catch (error) {
                console.error(`Error fetching ${type} genres:`, error);
            } finally {
                setLoading(false);
            }
        };

        setFilters({
            year: 'all',
            genre: 'all'
        });

        fetchGenres();
    }, [type]);

    useEffect(() => {
        // Update filters when initialFilters changes
        if (initialFilters) {
            setFilters(initialFilters);
        }
    }, [initialFilters]);
    
    const handleFilterChange = (filterType, value) => {
        const newFilters = {
            ...filters,
            [filterType]: value
        };
        
        setFilters(newFilters);
        
        if (onFilterChange) {
            onFilterChange(newFilters);
        }
    };
    
    const toggleExpanded = () => {
        setIsExpanded(!isExpanded);
    };
    
    const clearFilters = () => {
        const resetFilters = {
            year: 'all',
            genre: 'all'
        };
        setFilters(resetFilters);
        
        if (onFilterChange) {
            onFilterChange(resetFilters);
        }
    };

    const generateYearOptions = () => {
        const years = [];
        for (let year = yearRange.max; year >= yearRange.min; year--) {
            years.push(year);
        }
        return years;
    };
    
    if (loading) {
        return (
            <div className="filter-container loading">
                <div className="filter-header">
                    <h3>Loading Filters...</h3>
                </div>
            </div>
        );
    }
    
    return (
        <div className="filter-container">
            <div className="filter-header">
                <h3>Filter {getFilterTitle()}</h3>
                <div className="filter-actions">
                    <button 
                        className="filter-button clear-button" 
                        onClick={clearFilters}
                        aria-label="Clear filters"
                    >
                        Clear
                    </button>
                    <button 
                        className="filter-toggle" 
                        onClick={toggleExpanded} 
                        aria-expanded={isExpanded}
                        aria-controls="filter-options"
                    >
                        {isExpanded ? '−' : '+'}
                    </button>
                </div>
            </div>
            
            <div id="filter-options" className={`filter-options ${isExpanded ? 'expanded' : ''}`}>
                <div className="filter-group">
                    <label className="filter-label">{getFilterLabel()}</label>
                    <select 
                        value={filters.year} 
                        onChange={(e) => handleFilterChange('year', e.target.value)}
                        className="filter-select"
                    >
                        <option value="all">All {type === 'movie' ? 'Years' : 'Dates'}</option>
                        {generateYearOptions().map(year => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                    </select>
                </div>
                
                <div className="filter-group">
                    <label className="filter-label">Genre</label>
                    <select 
                        value={filters.genre} 
                        onChange={(e) => handleFilterChange('genre', e.target.value)}
                        className="filter-select"
                    >
                        <option value="all">All Genres</option>
                        {genres.map(genre => (
                            <option key={genre.id} value={genre.id}>
                                {genre.name}
                            </option>
                        ))}
                    </select>
                </div>
                
                <div className="filter-badge">
                    {filters.year !== 'all' || filters.genre !== 'all' ? (
                        <div className="filter-active-badge">
                            Filters Active
                            <span className="filter-count">
                                {(filters.year !== 'all' ? 1 : 0) + (filters.genre !== 'all' ? 1 : 0)}
                            </span>
                        </div>
                    ) : null}
                </div>
            </div>
        </div>
    );
};

export default Filter;
