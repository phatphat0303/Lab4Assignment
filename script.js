(function() {
    const studentsContainer = document.getElementById('students-container');

    //fetch data asynchronously using Fetch API
    async function fetchData() {
        try {
            const response = await fetch('students.json');
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    //display student data
    function displayStudents(students) {
        studentsContainer.innerHTML = ''; // Clear previous content
        students.forEach(student => {
            const studentDiv = document.createElement('div');
            studentDiv.innerHTML = `<p>Name: ${student.name}</p><p>Age: ${student.age}</p><p>Grade: ${student.grade}</p><p>Major: ${student.major}</p>`;
            studentsContainer.appendChild(studentDiv);
        });
    }

    //filter Computer Science students with age > 20
    function filterCSStudents(students) {
        const filteredStudents = students.filter(student => student.major === 'Computer Science' && student.age > 20);
        displayStudents(filteredStudents);
    }

    //calculate average age
    function calculateAverageAge(students) {
        const totalAge = students.reduce((sum, student) => sum + student.age, 0);
        const averageAge = totalAge / students.length;
        studentsContainer.textContent = 'Average Age: ' + averageAge.toFixed(2);
    }

    //filter students with odd index values
    function filterOddIndexStudents(students) {
        const oddIndexStudents = students.filter((student, index) => index % 2 !== 0);
        displayStudents(oddIndexStudents);
    }

    //fetch data and display students or error message
    fetchData()
    .then(students => {
        displayStudents(students);

        //filter CS students with age > 20
        document.getElementById('filter-cs-btn').addEventListener('click', () => {
            filterCSStudents(students);
        });

        //calculate average age
        document.getElementById('calculate-average-age-btn').addEventListener('click', () => {
            calculateAverageAge(students);
        });

        //filter students with odd index values
        document.getElementById('filter-odd-index-btn').addEventListener('click', () => {
            filterOddIndexStudents(students);
        });
    })
    .catch(error => {
        studentsContainer.textContent = 'Error: ' + error;
    });

})();
