/**
 * PLATAFORMA INTERACTIVA - ARCHIVO JAVASCRIPT PRINCIPAL
 * 
 * Este archivo contiene toda la lógica JavaScript para la plataforma web interactiva
 * que incluye secciones de gráficas (Chart.js) y mapa dinámico (Leaflet.js) con
 * capacidad de carga de datos desde archivos XLSX.
 * 
 * Estructura del código:
 * 1. Inicialización y configuración de gráficas (Chart.js)
 * 2. Inicialización y configuración del mapa dinámico (Leaflet.js)
 * 3. Funciones para manejo de marcadores
 * 4. Lógica para procesamiento de archivos XLSX
 * 5. Event listeners y funciones auxiliares
 * 
 * Dependencias externas:
 * - Chart.js (para gráficas)
 * - Leaflet.js (para mapas)
 * - SheetJS/xlsx (para procesamiento de archivos Excel)
 * 
 * Autor: Manus AI
 * Fecha: 2025
 */

// Esperar a que el DOM esté completamente cargado antes de ejecutar el código
document.addEventListener("DOMContentLoaded", function() {
    
    // ===== SECCIÓN 1: CONFIGURACIÓN DE GRÁFICAS CON CHART.JS =====
    
    /**
     * Configuración y renderizado del gráfico de barras
     * Muestra incidentes reportados por municipio en el área metropolitana de Guadalajara
     */
    function initializeBarChart() {
        // Datos de ejemplo realistas para el gráfico de barras
        const barChartData = {
            labels: ["Guadalajara", "Zapopan", "Tlaquepaque", "Tonalá", "Tlajomulco", "El Salto"],
            datasets: [{
                label: "Incidentes Reportados",
                data: [245, 189, 156, 134, 98, 67],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.8)',
                    'rgba(54, 162, 235, 0.8)',
                    'rgba(255, 206, 86, 0.8)',
                    'rgba(75, 192, 192, 0.8)',
                    'rgba(153, 102, 255, 0.8)',
                    'rgba(255, 159, 64, 0.8)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 2,
                borderRadius: 4,
                borderSkipped: false,
            }]
        };

        // Configuración avanzada del gráfico de barras
        const barChartConfig = {
            type: 'bar',
            data: barChartData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: 'Incidentes por Municipio - Área Metropolitana de Guadalajara',
                        font: {
                            size: 16,
                            weight: 'bold'
                        },
                        padding: 20
                    },
                    legend: {
                        display: true,
                        position: 'top',
                        labels: {
                            usePointStyle: true,
                            padding: 20
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        titleColor: 'white',
                        bodyColor: 'white',
                        borderColor: 'rgba(255, 255, 255, 0.1)',
                        borderWidth: 1,
                        cornerRadius: 8,
                        displayColors: true
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Número de Incidentes',
                            font: {
                                size: 14,
                                weight: 'bold'
                            }
                        },
                        grid: {
                            color: 'rgba(0, 0, 0, 0.1)'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Municipios',
                            font: {
                                size: 14,
                                weight: 'bold'
                            }
                        },
                        grid: {
                            display: false
                        }
                    }
                },
                animation: {
                    duration: 2000,
                    easing: 'easeInOutQuart'
                }
            }
        };

        // Renderizar el gráfico de barras
        const barChartCtx = document.getElementById('barChart').getContext('2d');
        new Chart(barChartCtx, barChartConfig);
    }

    /**
     * Configuración y renderizado del gráfico de líneas
     * Muestra la tendencia anual de incidentes totales vs resueltos
     */
    function initializeLineChart() {
        // Datos de ejemplo realistas para el gráfico de líneas
        const lineChartData = {
            labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", 
                    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
            datasets: [{
                label: "Incidentes Totales",
                data: [320, 298, 345, 367, 389, 412, 445, 423, 398, 376, 354, 341],
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                tension: 0.4,
                pointBackgroundColor: 'rgb(75, 192, 192)',
                pointBorderColor: '#fff',
                pointBorderWidth: 3,
                pointRadius: 6,
                pointHoverRadius: 8
            }, {
                label: "Incidentes Resueltos",
                data: [285, 267, 312, 334, 356, 378, 401, 389, 365, 343, 321, 308],
                fill: false,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                tension: 0.4,
                pointBackgroundColor: 'rgb(255, 99, 132)',
                pointBorderColor: '#fff',
                pointBorderWidth: 3,
                pointRadius: 6,
                pointHoverRadius: 8
            }]
        };

        // Configuración avanzada del gráfico de líneas
        const lineChartConfig = {
            type: 'line',
            data: lineChartData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: 'Tendencia Anual de Incidentes - 2024',
                        font: {
                            size: 16,
                            weight: 'bold'
                        },
                        padding: 20
                    },
                    legend: {
                        display: true,
                        position: 'top',
                        labels: {
                            usePointStyle: true,
                            padding: 20
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        titleColor: 'white',
                        bodyColor: 'white',
                        borderColor: 'rgba(255, 255, 255, 0.1)',
                        borderWidth: 1,
                        cornerRadius: 8,
                        displayColors: true,
                        mode: 'index',
                        intersect: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Número de Incidentes',
                            font: {
                                size: 14,
                                weight: 'bold'
                            }
                        },
                        grid: {
                            color: 'rgba(0, 0, 0, 0.1)'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Meses',
                            font: {
                                size: 14,
                                weight: 'bold'
                            }
                        },
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        }
                    }
                },
                interaction: {
                    intersect: false,
                    mode: 'index'
                },
                animation: {
                    duration: 2000,
                    easing: 'easeInOutQuart'
                }
            }
        };

        // Renderizar el gráfico de líneas
        const lineChartCtx = document.getElementById('lineChart').getContext('2d');
        new Chart(lineChartCtx, lineChartConfig);
    }

    // Inicializar ambas gráficas
    initializeBarChart();
    initializeLineChart();

    // ===== SECCIÓN 2: CONFIGURACIÓN DEL MAPA DINÁMICO CON LEAFLET.JS =====

    /**
     * Inicialización del mapa base con Leaflet
     * Centrado en Guadalajara, Jalisco con múltiples capas base
     */
    function initializeMap() {
        // Coordenadas de Guadalajara: [20.659698, -103.349609]
        // Nivel de zoom: 11 (adecuado para ver el área metropolitana)
        const mymap = L.map('mapid').setView([20.659698, -103.349609], 11);

        // Definir múltiples capas base para el usuario
        const osmLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            maxZoom: 19,
        });

        const Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
            attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
            maxZoom: 19
        });

        const CartoDB_Positron = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
            subdomains: 'abcd',
            maxZoom: 19
        });

        // Añadir la capa base por defecto (OpenStreetMap)
        osmLayer.addTo(mymap);

        // Configurar el control de capas
        const baseLayers = {
            "🗺️ OpenStreetMap": osmLayer,
            "🛰️ Satélite Esri": Esri_WorldImagery,
            "🎨 CartoDB Light": CartoDB_Positron
        };

        // Grupo de capas para los marcadores cargados desde XLSX
        const markersFromXLSX = L.layerGroup();
        
        const overlayLayers = {
            "📍 Puntos desde XLSX": markersFromXLSX
        };

        // Añadir el control de capas al mapa
        L.control.layers(baseLayers, overlayLayers, {
            position: 'topright',
            collapsed: false
        }).addTo(mymap);

        // Añadir control de escala
        L.control.scale({
            position: 'bottomleft',
            metric: true,
            imperial: false
        }).addTo(mymap);

        return { mymap, markersFromXLSX };
    }

    // Inicializar el mapa y obtener referencias
    const { mymap, markersFromXLSX } = initializeMap();

    // ===== SECCIÓN 3: FUNCIONES PARA MANEJO DE MARCADORES =====

    /**
     * Función para añadir un marcador al mapa con popup personalizado
     * @param {number} lat - Latitud del marcador
     * @param {number} lon - Longitud del marcador
     * @param {string} name - Nombre del punto
     * @param {string} description - Descripción del punto
     * @param {string} category - Categoría del punto (determina el color del icono)
     * @returns {L.Marker} - El marcador creado
     */
    function addMarkerToMap(lat, lon, name, description, category = "general") {
        // Mapeo de categorías a colores de iconos
        const categoryColors = {
            'seguridad': 'red',
            'salud': 'green',
            'educacion': 'orange',
            'transporte': 'purple',
            'turismo': 'blue',
            'comercio': 'yellow',
            'gobierno': 'grey',
            'general': 'blue'
        };

        const iconColor = categoryColors[String(category).toLowerCase()] || 'blue';

        // Crear el marcador con icono personalizado
        const marker = L.marker([lat, lon], {
            icon: L.icon({
                iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${iconColor}.png`,
                shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [41, 41]
            })
        });

        // Crear contenido del popup con información detallada y estilizada
        const popupContent = `
            <div style="min-width: 250px; font-family: 'Segoe UI', sans-serif;">
                <h3 style="margin: 0 0 15px 0; color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 8px;">
                    ${name}
                </h3>
                <div style="margin: 10px 0;">
                    <strong style="color: #34495e;">📝 Descripción:</strong>
                    <p style="margin: 5px 0; color: #555; line-height: 1.4;">${description}</p>
                </div>
                <div style="margin: 10px 0;">
                    <strong style="color: #34495e;">🏷️ Categoría:</strong>
                    <span style="background: #3498db; color: white; padding: 2px 8px; border-radius: 12px; font-size: 0.85em; margin-left: 5px;">
                        ${category}
                    </span>
                </div>
                <div style="margin: 10px 0; font-size: 0.9em; color: #7f8c8d;">
                    <strong>📍 Coordenadas:</strong> ${lat.toFixed(6)}, ${lon.toFixed(6)}
                </div>
            </div>
        `;

        marker.bindPopup(popupContent, {
            maxWidth: 300,
            className: 'custom-popup'
        });

        return marker;
    }

    /**
     * Añadir marcadores de ejemplo para demostrar la funcionalidad
     */
    function addExampleMarkers() {
        const exampleMarkers = [
            {
                lat: 20.6736,
                lon: -103.3409,
                name: "Centro Histórico de Guadalajara",
                description: "Zona histórica y cultural de la ciudad, patrimonio de la humanidad",
                category: "turismo"
            },
            {
                lat: 20.7342,
                lon: -103.4622,
                name: "Hospital Civil de Guadalajara",
                description: "Principal hospital público de la región metropolitana",
                category: "salud"
            },
            {
                lat: 20.6066,
                lon: -103.4175,
                name: "Universidad de Guadalajara",
                description: "Campus principal de la universidad estatal más importante de Jalisco",
                category: "educacion"
            },
            {
                lat: 20.6597,
                lon: -103.3496,
                name: "Estación del Tren Ligero",
                descri
(Content truncated due to size limit. Use line ranges to read in chunks)