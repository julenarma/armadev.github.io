document.addEventListener("DOMContentLoaded", function () {


    var toggleMenu = document.getElementById('toggleMenu');
    console.log(toggleMenu);
    //------Data AOS animación start----
    AOS.init({
        offset: 200, // Offset (in px) from the original trigger point
        easing: 'ease-in-out', // Easing function
        duration: 1000,
        once: true // Animation should happen only once
    });

    // Botón mi trayectoria hacia mi cv

    $('.button-sobremi').on('click', function () {
        $('html, body').animate({
            scrollTop: $('.about-section').offset().top -200  // Ajusta el valor según la altura de tu encabezado
        }, 1000);
    });


    // Acordeón cv
    document.querySelectorAll('.accordion').forEach(item => {
        item.addEventListener('click', () => {
            const panel = item.nextElementSibling; // Panel correspondiente

            // Cerrar otros paneles
            document.querySelectorAll('.panel').forEach(otherPanel => {
                if (otherPanel !== panel) {
                    otherPanel.style.maxHeight = null; // Cerrar el panel
                    otherPanel.previousElementSibling.classList.remove('active'); // Quitar clase active
                }
            });

            // Alternar clase active en el acordeón actual
            item.classList.toggle('active');

            // Expandir o colapsar el panel actual
            if (panel.style.maxHeight) {
                panel.style.maxHeight = null; // Cerrar el panel
            } else {
                panel.style.maxHeight = panel.scrollHeight + "px"; // Abrir el panel

            }
        });
    });



    // -------------------------GRAFICO LINEAL EDUCACIÓN-------------------------

    const ctxEducationLine = document.getElementById('educationChart').getContext('2d');

    const educationData = {
        labels: ['E.S.O.', 'Bachillerato', 'Desarrollo Web', 'Desarrollo Multiplataforma', 'Curso Especialización Ciberseguridad'],
        datasets: [{
            label: 'Nivel Educativo',
            data: [1, 2, 3, 4, 5], // Niveles educativos
            borderColor: 'rgba(41, 128, 185, 1)',
            backgroundColor: 'rgba(41, 128, 185, 0.2)',
            fill: true,
            tension: 0.3
        }]
    };

    const educationChart = new Chart(ctxEducationLine, {
        type: 'line',
        data: educationData,
        options: {
            responsive: true,
            scales: {
                y: {
                    title: {
                        display: true,
                        text: 'Nivel Educativo'
                    },
                    ticks: {
                        callback: function (value) {
                            const levels = ['E.S.O.', 'Bachillerato', 'Desarrollo Web', 'Desarrollo Multiplataforma', 'Curso Especialización Ciberseguridad'];
                            return levels[value - 1];
                        }
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Índice'
                    },
                    ticks: {
                        callback: function (value, index) {
                            return index + 1; // Muestra 1, 2, 3, 4, 5
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    display: true
                }
            }
        }
    });
    // -------------------------GRAFICO EXPERIENCIA-------------------------

    // Función para calcular la experiencia en años
    function calculateExperience(startDate, endDate) {
        const now = endDate ? new Date(endDate) : new Date(); // Usa la fecha de fin si existe
        const start = new Date(startDate);
        const diff = now - start; // Diferencia en milisegundos
        const years = diff / (1000 * 60 * 60 * 24 * 365); // Convertir a años
        return years.toFixed(1); // Redondear a un decimal
    }

    // Fechas de inicio y fin de experiencia laboral
    const experiences = [{
            company: 'EITB',
            startDate: '2021-03-01',
            endDate: '2021-06-30' // Fecha de fin
        },
        {
            company: 'Accenture',
            startDate: '2022-03-01',
            endDate: '2022-06-30' // Fecha de fin
        },
        {
            company: 'WatchGuard Technologies',
            startDate: '2023-03-31',
            endDate: null // Actual
        },
    ];

    // Calcular años de experiencia para cada empresa
    const experienceData = experiences.map(exp => calculateExperience(exp.startDate, exp.endDate));

    // Inicializa el gráfico de experiencia laboral
    const ctxExperienceBar = document.getElementById('experienceChart').getContext('2d');

    const experienceChartData = {
        labels: experiences.map(exp => exp.company),
        datasets: [{
            label: 'Años de Experiencia',
            data: experienceData, // Usar los datos calculados
            backgroundColor: 'rgba(41, 128, 185, 0.7)',
        }]
    };

    new Chart(ctxExperienceBar, {
        type: 'bar',
        data: experienceChartData,
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Años'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Empresas'
                    }
                }
            },
            plugins: {
                legend: {
                    display: true
                }
            }
        }
    });


    // -------------------------GRAFICO HABILIDADES-------------------------
    const ctx = document.getElementById('skillsChart').getContext('2d');

    const skillsData = {
        labels: [
            'HTML', 'CSS', 'JavaScript', 'PHP', 'Python',
            'C#', 'Laravel', 'Vue.js', 'Flutter',
            'MySQL', 'SQLite', 'Git', 'GitHub',
            'Visual Studio', 'Firebase', 'Atlassian',
            'MITRE ATT&CK', 'EDR/MDR/XDR', 'Threat Hunting'
        ],
        datasets: [{
            label: 'Habilidades',
            data: [10, 10, 9, 10, 8, 7, 6, 8, 6, 9, 8, 10, 10, 10, 9, 10, 9, 9, 9], // Datos
            backgroundColor: 'rgba(41, 128, 185, 0.5)', // Color de fondo del área
            borderColor: 'rgba(41, 128, 185, 1)', // Color de la línea
            borderWidth: 3, // Grosor de la línea
            pointBackgroundColor: '#fff', // Color de fondo de los puntos
            pointBorderColor: 'rgba(41, 128, 185, 1)', // Color del borde de los puntos
            pointHoverBackgroundColor: '#000', // Fondo negro al hacer hover
            pointHoverBorderColor: 'rgba(255, 255, 255, 1)', // Borde blanco al hacer hover
            pointHoverRadius: 6, // Radio de los puntos al hacer hover
            fill: true, // Rellenar el área debajo de la línea
        }]
    };

    new Chart(ctx, {
        type: 'radar',
        data: skillsData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                r: {
                    angleLines: {
                        display: true,
                        color: 'rgba(255, 255, 255, 0.3)', // Color de las líneas de ángulo
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)', // Color de la cuadrícula
                    },
                    ticks: {
                        color: '#fff', // Color de las etiquetas
                        backdropColor: 'rgba(41, 128, 185, 0.7)', // Fondo de las etiquetas
                        padding: 10,
                        font: {
                            size: 14,
                            weight: 'bold',
                            family: 'Arial',
                        },
                        stepSize: 1,
                        suggestedMin: 0,
                        suggestedMax: 10,
                    },
                }
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                    labels: {
                        font: {
                            size: 16,
                            weight: 'bold',
                            family: 'Arial',
                        },
                        color: '#fff', // Color de la leyenda
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)', // Fondo oscuro para el tooltip
                    titleColor: '#fff',
                    bodyColor: '#fff',
                    borderColor: 'rgba(41, 128, 185, 1)',
                    borderWidth: 2,
                    padding: 10,
                    callbacks: {
                        label: function (tooltipItem) {
                            return `${tooltipItem.label}: ${tooltipItem.raw}`; // Mostrar etiqueta y valor
                        }
                    }
                }
            },
            elements: {
                line: {
                    tension: 0.3, // Suavizado de las líneas
                    borderCapStyle: 'round', // Esquinas redondeadas
                    borderJoinStyle: 'round', // Unión redondeada
                }
            },
            animation: {
                duration: 800, // Duración de la animación
                easing: 'easeInOutExpo', // Easing de la animación
            },
            hover: {
                mode: 'nearest',
                intersect: true,
            },
        }
    });



    // -------------------------GRAFICO EDUCACIÓN-------------------------



});