function showTab(tabName) {
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => {
        if (tab.id === tabName) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    });
    updateExtrasCount(); // Update extras count whenever the tab is switched
    if (tabName === 'planning') {
        populateUnassignedDriverList();
        populateUnassignedRouteList();
    }
}

const driverRouteReference = [
    { seniority: 1, name: 'Jewell, Keith', routeId: '32D' },
    { seniority: 2, name: 'Landis, Matt', routeId: '35B' },
    { seniority: 3, name: 'Erickson, Tony', routeId: '32C' },
    { seniority: 4, name: 'Bromaghin, Roy', routeId: '30B' },
    { seniority: 5, name: 'Spencer, Pat', routeId: '34A' },
    { seniority: 6, name: 'Olafson, Andy', routeId: '33A' },
    { seniority: 7, name: 'Stebe, Mike', routeId: '32E' },
    { seniority: 8, name: 'Beam, David', routeId: '30A' },
    { seniority: 9, name: 'Foss, Naomi', routeId: '32I' },
    { seniority: 10, name: 'Wiegman, Nate', routeId: '31A' },
    { seniority: 11, name: 'Haaland, Gabriel', routeId: '33E' },
    { seniority: 12, name: 'Peterson, Doug', routeId: '35C' },
    { seniority: 13, name: 'Doughtery, Jaime', routeId: '31D' },
    { seniority: 14, name: 'Evan Hanks', routeId: '32A' },
    { seniority: 15, name: 'Quance, Doug', routeId: '33D' },
    { seniority: 16, name: 'Pendleton, Tyler', routeId: null },
    { seniority: 17, name: 'Carlson, Sam', routeId: null },
    { seniority: 18, name: 'Christenson, Brad', routeId: null },
    { seniority: 19, name: 'Elting, Jamie', routeId: '30C' },
    { seniority: 20, name: 'Neustel, Kory', routeId: null },
    { seniority: 21, name: 'Stevens, Derek', routeId: null },
    { seniority: 22, name: 'Prokott, Josh', routeId: null },
    { seniority: 23, name: 'Peterson, James', routeId: '35A' },
    { seniority: 24, name: 'McCormick, Mike', routeId: '33B' },
    { seniority: 25, name: 'Shaw, Justin', routeId: '33C' },
    { seniority: 26, name: 'Glassman, Joe', routeId: '31F' },
    { seniority: 27, name: 'Kaiser, Matt', routeId: '32B' },
    { seniority: 28, name: 'Oelke, Logan', routeId: '34B' },
    { seniority: 29, name: 'Haack, Cory', routeId: null },
    { seniority: 30, name: 'Roger, Luke', routeId: null },
    { seniority: 31, name: 'Chase Rivera', routeId: '31B' },
    { seniority: 32, name: 'Mike Vojak', routeId: null },
    { seniority: 33, name: 'Parsons, Jacob', routeId: '31C' },
    { seniority: 34, name: 'Paggen, Brody', routeId: null },
    { seniority: 35, name: 'Johannsen, Wyatt', routeId: null },
    { seniority: 36, name: 'Dickenson, John', routeId: null }
];


const drivers = [
    { seniority: 1, name: 'Jewell, Keith', routeId: '32D', goingHome: 'Unconfirmed', notes: '' },
    { seniority: 2, name: 'Landis, Matt', routeId: '35B', goingHome: 'Unconfirmed', notes: '' },
    { seniority: 3, name: 'Erickson, Tony', routeId: '32C', goingHome: 'Unconfirmed', notes: '' },
    { seniority: 4, name: 'Bromaghin, Roy', routeId: '30B', goingHome: 'Unconfirmed', notes: '' },
    { seniority: 5, name: 'Spencer, Pat', routeId: '34A', goingHome: 'Unconfirmed', notes: '' },
    { seniority: 6, name: 'Olafson, Andy', routeId: '33A', goingHome: 'Unconfirmed', notes: '' },
    { seniority: 7, name: 'Stebe, Mike', routeId: '32E', goingHome: 'Unconfirmed', notes: '' },
    { seniority: 8, name: 'Beam, David', routeId: '30A', goingHome: 'Unconfirmed', notes: '' },
    { seniority: 9, name: 'Foss, Naomi', routeId: '32I', goingHome: 'Unconfirmed', notes: '' },
    { seniority: 10, name: 'Wiegman, Nate', routeId: '31A', goingHome: 'Unconfirmed', notes: '' },
    { seniority: 11, name: 'Haaland, Gabriel', routeId: '33E', goingHome: 'Unconfirmed', notes: '' },
    { seniority: 12, name: 'Peterson, Doug', routeId: '35C', goingHome: 'Unconfirmed', notes: '' },
    { seniority: 13, name: 'Doughtery, Jaime', routeId: '31D', goingHome: 'Unconfirmed', notes: '' },
    { seniority: 14, name: 'Evan Hanks', routeId: '32A', goingHome: 'Unconfirmed', notes: '' },
    { seniority: 15, name: 'Quance, Doug', routeId: '33D', goingHome: 'Unconfirmed', notes: '' },
    { seniority: 16, name: 'Pendleton, Tyler', routeId: 'Unassigned', goingHome: 'Unconfirmed', notes: '' },
    { seniority: 17, name: 'Carlson, Sam', routeId: 'Unassigned', goingHome: 'Unconfirmed', notes: '' },
    { seniority: 18, name: 'Christenson, Brad', routeId: 'Unassigned', goingHome: 'Unconfirmed', notes: '' },
    { seniority: 19, name: 'Elting, Jamie', routeId: '30C', goingHome: 'Unconfirmed', notes: '' },
    { seniority: 20, name: 'Neustel, Kory', routeId: 'Unassigned', goingHome: 'Unconfirmed', notes: '' },
    { seniority: 21, name: 'Stevens, Derek', routeId: 'Unassigned', goingHome: 'Unconfirmed', notes: '' },
    { seniority: 22, name: 'Prokott, Josh', routeId: 'Unassigned', goingHome: 'Unconfirmed', notes: '' },
    { seniority: 23, name: 'Peterson, James', routeId: '35A', goingHome: 'Unconfirmed', notes: '' },
    { seniority: 24, name: 'McCormick, Mike', routeId: '33B', goingHome: 'Unconfirmed', notes: '' },
    { seniority: 25, name: 'Shaw, Justin', routeId: '33C', goingHome: 'Unconfirmed', notes: '' },
    { seniority: 26, name: 'Glassman, Joe', routeId: '31F', goingHome: 'Unconfirmed', notes: '' },
    { seniority: 27, name: 'Kaiser, Matt', routeId: '32B', goingHome: 'Unconfirmed', notes: '' },
    { seniority: 28, name: 'Oelke, Logan', routeId: '34B', goingHome: 'Unconfirmed', notes: '' },
    { seniority: 29, name: 'Haack, Cory', routeId: 'Unassigned', goingHome: 'Unconfirmed', notes: '' },
    { seniority: 30, name: 'Roger, Luke', routeId: 'Unassigned', goingHome: 'Unconfirmed', notes: '' },
    { seniority: 31, name: 'Chase Rivera', routeId: '31B', goingHome: 'Unconfirmed', notes: '' },
    { seniority: 32, name: 'Mike Vojak', routeId: 'Unassigned', goingHome: 'Unconfirmed', notes: '' },
    { seniority: 33, name: 'Parsons, Jacob', routeId: '31C', goingHome: 'Unconfirmed', notes: '' },
    { seniority: 34, name: 'Paggen, Brody', routeId: 'Unassigned', goingHome: 'Unconfirmed', notes: '' },
    { seniority: 35, name: 'Johannsen, Wyatt', routeId: 'Unassigned', goingHome: 'Unconfirmed', notes: '' },
    { seniority: 36, name: 'Dickenson, John', routeId: 'Unassigned', goingHome: 'Unconfirmed', notes: '' }
];


const routes = [
    { routeId: '32D', name: 'Route 32D', notes: '', assignedDriver: 'Jewell, Keith' },
    { routeId: '35B', name: 'Route 35B', notes: '', assignedDriver: 'Landis, Matt' },
    { routeId: '32C', name: 'Route 32C', notes: '', assignedDriver: 'Erickson, Tony' },
    { routeId: '30B', name: 'Route 30B', notes: '', assignedDriver: 'Bromaghin, Roy' },
    { routeId: '34A', name: 'Route 34A', notes: '', assignedDriver: 'Spencer, Pat' },
    { routeId: '33A', name: 'Route 33A', notes: '', assignedDriver: 'Olafson, Andy' },
    { routeId: '32E', name: 'Route 32E', notes: '', assignedDriver: 'Stebe, Mike' },
    { routeId: '30A', name: 'Route 30A', notes: '', assignedDriver: 'Beam, David' },
    { routeId: '32I', name: 'Route 32I', notes: '', assignedDriver: 'Foss, Naomi' },
    { routeId: '31A', name: 'Route 31A', notes: '', assignedDriver: 'Wiegman, Nate' },
    { routeId: '33E', name: 'Route 33E', notes: '', assignedDriver: 'Haaland, Gabriel' },
    { routeId: '35C', name: 'Route 35C', notes: '', assignedDriver: 'Peterson, Doug' },
    { routeId: '31D', name: 'Route 31D', notes: '', assignedDriver: 'Doughtery, Jaime' },
    { routeId: '32A', name: 'Route 32A', notes: '', assignedDriver: 'Evan Hanks' },
    { routeId: '33D', name: 'Route 33D', notes: '', assignedDriver: 'Quance, Doug' },
    { routeId: '30C', name: 'Route 30C', notes: '', assignedDriver: 'Elting, Jamie' },
    { routeId: '35A', name: 'Route 35A', notes: '', assignedDriver: 'Peterson, James' },
    { routeId: '33B', name: 'Route 33B', notes: '', assignedDriver: 'McCormick, Mike' },
    { routeId: '33C', name: 'Route 33C', notes: '', assignedDriver: 'Shaw, Justin' },
    { routeId: '31F', name: 'Route 31F', notes: '', assignedDriver: 'Glassman, Joe' },
    { routeId: '32B', name: 'Route 32B', notes: '', assignedDriver: 'Kaiser, Matt' },
    { routeId: '34B', name: 'Route 34B', notes: '', assignedDriver: 'Oelke, Logan' },
    { routeId: '31B', name: 'Route 31B', notes: '', assignedDriver: 'Chase Rivera' },
    { routeId: '31C', name: 'Route 31C', notes: '', assignedDriver: 'Parsons, Jacob' }
];


function changeGoingHomeStatus(driverIndex, status) {
    const currentDriver = drivers[driverIndex];
    const routeReference = driverRouteReference.find(ref => ref.name === currentDriver.name);

    if (status === 'Yes') {
        unassignRoute(driverIndex);
    } else if (currentDriver.goingHome === 'Yes' && (status === 'Unconfirmed' || status === 'No' || status === 'Maybe') && routeReference) {
        const route = routes.find(r => r.routeId === routeReference.routeId);

        if (route) {
            const confirmation = confirm(`This driver has a reference route ${routeReference.routeId}. Do you want to assign this route to the driver?`);
            if (confirmation) {
                assignRoute(driverIndex, routeReference.routeId);
            }
        }
    }

    drivers[driverIndex].goingHome = status;
    populateDriverTable();
    updateExtrasCount(); // Update extras count whenever status is changed
}

function createButton(text, color, onClick) {
    const button = document.createElement('button');
    button.textContent = text;
    button.style.backgroundColor = color;
    button.style.color = 'black'; // Change font color to black
    button.style.marginLeft = '5px'; // Add margin between buttons
    button.onclick = onClick;
    return button;
}

function getRowColor(status) {
    switch(status) {
        case 'Unconfirmed':
            return 'white';
        case 'Yes':
            return 'lightblue';
        case 'No':
            return 'lightgreen';
        case 'Maybe':
            return '#FFD700'; // Darker yellow for better visibility
        default:
            return 'white';
    }
}

function unassignRoute(driverIndex) {
    const routeId = drivers[driverIndex].routeId;
    drivers[driverIndex].routeId = 'Unassigned';
    routes.forEach(route => {
        if (route.routeId === routeId) {
            route.assignedDriver = null;
        }
    });
    populateDriverTable();
    populateRouteTable(); // Update route table
    updateExtrasCount(); // Update extras count whenever a route is unassigned
}

function updateExtrasCount() {
    const unconfirmedDrivers = drivers.filter(driver => ['Unconfirmed', 'No', 'Maybe'].includes(driver.goingHome)).length;
    const extrasCount = unconfirmedDrivers - routes.length;
    document.getElementById('extras-count').textContent = extrasCount;
}

function populateDriverTable() {
    const tableBody = document.getElementById('driver-table-body');
    console.log('Populating driver table');
    console.log('Drivers:', drivers);
    tableBody.innerHTML = '';
    drivers.forEach((driver, index) => {
        const row = document.createElement('tr');
        row.style.backgroundColor = getRowColor(driver.goingHome); // Set row color based on goingHome status
        row.innerHTML = `
            <td>${driver.seniority}</td>
            <td>${driver.name}</td>
            <td>
                ${driver.routeId !== 'Unassigned' ? `
                    <span>${driver.routeId}</span>
                    <button onclick="unassignRoute(${index})">Unassign</button>
                ` : `
                    <select onchange="assignRoute(${index}, this.value)">
                        <option value="">Select Route</option>
                        ${routes.filter(route => route.assignedDriver === null).map(route => `<option value="${route.routeId}">${route.routeId}</option>`).join('')}
                    </select>
                `}
            </td>
            <td>${driver.goingHome}</td>
            <td>
                <span>${driver.notes}</span>
                <button onclick="editNotes(${index})">Edit</button>
            </td>
        `;
        console.log('Adding row:', row);

        // Create buttons for changing Going Home status
        const buttonContainer = document.createElement('span');
        buttonContainer.style.display = 'inline-flex';
        buttonContainer.style.alignItems = 'center';
        buttonContainer.appendChild(createButton('Unconfirmed', 'white', () => changeGoingHomeStatus(index, 'Unconfirmed')));
        buttonContainer.appendChild(createButton('Yes', 'lightblue', () => changeGoingHomeStatus(index, 'Yes')));
        buttonContainer.appendChild(createButton('No', 'lightgreen', () => changeGoingHomeStatus(index, 'No')));
        buttonContainer.appendChild(createButton('Maybe', '#FFD700', () => changeGoingHomeStatus(index, 'Maybe')));
        row.cells[3].appendChild(buttonContainer);

        tableBody.appendChild(row);
    });
}

function assignRoute(driverIndex, routeId) {
    const driver = drivers[driverIndex];
    const previousRoute = driver.routeId;
    driver.routeId = routeId;
    
    // Update the route's assigned driver
    if (routeId !== 'Unassigned') {
        const route = routes.find(route => route.routeId === routeId);
        if (route) {
            route.assignedDriver = driver.name;
        }
    }
    
    // Clear the previous route's assigned driver if necessary
    if (previousRoute !== 'Unassigned') {
        const previousRouteObj = routes.find(route => route.routeId === previousRoute);
        if (previousRouteObj) {
            previousRouteObj.assignedDriver = null;
        }
    }
    
    populateDriverTable();
    populateRouteTable(); // Update route table
    updateExtrasCount(); // Update extras count whenever a route is assigned
}

function sortTable(tabName, columnIndex) {
    const tab = document.getElementById(tabName);
    const table = tab.getElementsByTagName('table')[0];
    const tbody = table.getElementsByTagName('tbody')[0];
    const rows = Array.from(tbody.rows);

    rows.sort((a, b) => {
        const cellA = a.cells[columnIndex].innerText;
        const cellB = b.cells[columnIndex].innerText;
        return cellA.localeCompare(cellB, undefined, { numeric: true });
    });

    rows.forEach(row => tbody.appendChild(row));
}

function addRoute() {
    const routeId = document.getElementById('route-id').value;
    const routeName = document.getElementById('route-name').value;
    const routeNotes = document.getElementById('route-notes').value;
    if (routeId) {  // Only check for routeId
        const newRoute = { routeId, name: routeName || 'N/A', notes: routeNotes, assignedDriver: null };
        routes.push(newRoute);
        console.log('Route added:', newRoute);
        document.getElementById('route-id').value = '';
        document.getElementById('route-name').value = '';
        document.getElementById('route-notes').value = '';
        populateRouteTable();
        populateDriverTable(); // Update driver table as well
        updateExtrasCount(); // Update extras count whenever a new route is added
    } else {
        alert('Please enter the route ID.');
    }
}

function addDriver() {
    const name = document.getElementById('driver-name').value;
    const seniority = parseInt(document.getElementById('driver-seniority').value);
    const routeId = document.getElementById('driver-route').value || 'Unassigned';
    const goingHome = document.getElementById('driver-goinghome').value;
    const notes = document.getElementById('driver-notes').value;
    console.log(`Adding driver: ${name}, Seniority: ${seniority}, Route: ${routeId}, Going Home: ${goingHome}, Notes: ${notes}`);

    // Check if seniority number is unique
    const existingDriverIndex = drivers.findIndex(driver => driver.seniority === seniority);
    if (existingDriverIndex !== -1) {
        const confirmation = confirm(`A driver with seniority number ${seniority} already exists. Do you want to replace and update all subsequent drivers' seniority numbers?`);
        if (confirmation) {
            // Update subsequent drivers' seniority numbers
            for (let i = existingDriverIndex; i < drivers.length; i++) {
                drivers[i].seniority += 1;
            }
        } else {
            return; // Exit if the user does not confirm
        }
    }

    if (name && seniority) {
        const newDriver = { seniority, name, routeId, goingHome, notes };
        drivers.push(newDriver);
        drivers.sort((a, b) => a.seniority - b.seniority); // Ensure the drivers are sorted by seniority
        console.log('Driver added:', newDriver);
        document.getElementById('driver-name').value = '';
        document.getElementById('driver-seniority').value = '';
        document.getElementById('driver-route').value = '';
        document.getElementById('driver-goinghome').value = 'Unconfirmed';
        document.getElementById('driver-notes').value = '';
        populateDriverTable();
        populateRouteTable(); // Update route table
        updateExtrasCount(); // Update extras count whenever a new driver is added
    } else {
        alert('Please enter both name and seniority.');
    }
}

function populateRouteTable() {
    const tableBody = document.getElementById('route-table-body');
    tableBody.innerHTML = '';
    routes.forEach((route, routeIndex) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                ${route.routeId}
                <button style="background-color: red; color: black; margin-left: 5px;" onclick="removeRoute(${routeIndex})">Remove Route</button>
            </td>
            <td>${route.name || 'N/A'}</td>
            <td>
                ${route.assignedDriver ? `
                    <span>${route.assignedDriver}</span>
                    <button onclick="confirmUnassignDriver(${routeIndex})">Unassign</button>
                ` : `
                    <select onchange="assignDriver(${routeIndex}, this.value)">
                        <option value="">Select Driver</option>
                        ${drivers.filter(driver => driver.routeId === 'Unassigned' && driver.goingHome !== 'Yes').map(driver => `<option value="${driver.name}">${driver.name}</option>`).join('')}
                    </select>
                `}
            </td>
            <td>
                <span>${route.notes}</span>
                <button onclick="editRouteNotes(${routeIndex})">Edit</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function removeRoute(routeIndex) {
    const confirmation = confirm("Are you sure you want to remove this route?");
    if (confirmation) {
        const route = routes[routeIndex];
        // Unassign the driver if there is one
        if (route.assignedDriver) {
            const driver = drivers.find(driver => driver.name === route.assignedDriver);
            if (driver) {
                driver.routeId = 'Unassigned';
            }
        }
        routes.splice(routeIndex, 1);
        populateRouteTable();
        populateDriverTable(); // Update driver table as well
        updateExtrasCount(); // Update extras count whenever a route is removed
    }
}

function confirmUnassignDriver(routeIndex) {
    const confirmation = confirm("Are you sure you want to unassign this driver?");
    if (confirmation) {
        const route = routes[routeIndex];
        const driver = drivers.find(driver => driver.name === route.assignedDriver);
        if (driver) {
            driver.routeId = 'Unassigned';
        }
        route.assignedDriver = null;
        populateRouteTable();
        populateDriverTable(); // Update driver table as well
        updateExtrasCount(); // Update extras count whenever a driver is unassigned
    }
}

function assignDriver(routeIndex, driverName) {
    const route = routes[routeIndex];
    const driver = drivers.find(driver => driver.name === driverName);
    if (driver) {
        driver.routeId = route.routeId;
        route.assignedDriver = driver.name;
        populateRouteTable();
        populateDriverTable(); // Update driver table as well
        updateExtrasCount(); // Update extras count whenever a driver is assigned
    }
}

function editRouteNotes(routeIndex) {
    const newNotes = prompt('Enter new notes:', routes[routeIndex].notes);
    if (newNotes !== null) {
        routes[routeIndex].notes = newNotes;
        populateRouteTable();
    }
}

function populateUnassignedDriverList() {
    const unassignedDriverList = document.getElementById('unassigned-driver-list');
    unassignedDriverList.innerHTML = '';
    drivers
        .filter(driver => driver.routeId === 'Unassigned' && driver.goingHome !== 'Yes')
        .forEach(driver => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                ${driver.seniority}. ${driver.name}
                <select id="route-select-${driver.name}">
                    <option value="">Select Route</option>
                    ${routes.filter(route => route.assignedDriver === null).map(route => `<option value="${route.routeId}">${route.routeId}</option>`).join('')}
                </select>
                <button onclick="assignRouteToDriver('${driver.name}')">Assign</button>
                <button style="background-color: lightblue; color: black; margin-left: 5px;" onclick="setDriverGoingHome('${driver.name}')">Going Home</button>
            `;
            unassignedDriverList.appendChild(listItem);
        });
}

function setDriverGoingHome(driverName) {
    const driverIndex = drivers.findIndex(driver => driver.name === driverName);
    if (driverIndex !== -1) {
        drivers[driverIndex].goingHome = 'Yes';
        populateDriverTable(); // Update driver table to reflect changes
        populateUnassignedDriverList(); // Update unassigned driver list to reflect changes
    }
}

function assignRouteToDriver(driverName) {
    const driver = drivers.find(driver => driver.name === driverName);
    const selectElement = document.getElementById(`route-select-${driver.name}`);
    const routeId = selectElement.value;
    if (routeId) {
        driver.routeId = routeId;
        const route = routes.find(route => route.routeId === routeId);
        if (route) {
            route.assignedDriver = driver.name;
        }
        populateRouteTable();
        populateDriverTable(); // Update driver table as well
        updateExtrasCount(); // Update extras count whenever a route is assigned
        populateUnassignedDriverList(); // Update unassigned driver list
        populateUnassignedRouteList(); // Update unassigned route list
    } else {
        alert('Please select a route to assign.');
    }
}

function populateUnassignedRouteList() {
    const unassignedRouteList = document.getElementById('unassigned-route-list');
    unassignedRouteList.innerHTML = '';
    routes
        .filter(route => route.assignedDriver === null)
        .forEach(route => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                ${route.routeId} - ${route.name}
                <select id="driver-select-${route.routeId}">
                    <option value="">Select Driver</option>
                    ${drivers.filter(driver => driver.routeId === 'Unassigned' && driver.goingHome !== 'Yes').map(driver => `<option value="${driver.name}">${driver.name}</option>`).join('')}
                </select>
                <button onclick="assignDriverToRoute('${route.routeId}')">Assign</button>
            `;
            unassignedRouteList.appendChild(listItem);
        });
}


function assignDriverToRoute(routeId) {
    const route = routes.find(route => route.routeId === routeId);
    const selectElement = document.getElementById(`driver-select-${routeId}`);
    const driverName = selectElement.value;
    if (driverName) {
        const driver = drivers.find(driver => driver.name === driverName);
        if (driver) {
            driver.routeId = routeId;
            route.assignedDriver = driver.name;
            populateRouteTable();
            populateDriverTable(); // Update driver table as well
            updateExtrasCount(); // Update extras count whenever a driver is assigned
            populateUnassignedDriverList(); // Update unassigned driver list
            populateUnassignedRouteList(); // Update unassigned route list
        }
    } else {
        alert('Please select a driver to assign.');
    }
}

// Event listeners for buttons and initializing lists
document.addEventListener('DOMContentLoaded', () => {
    showTab('drivers');
    populateDriverTable();
    populateRouteTable();
    updateExtrasCount(); // Initialize extras count on load
});