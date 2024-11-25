document.getElementById('recommendForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const location = document.getElementById('location').value.trim();
    const productType = document.getElementById('productType').value.trim();

    // Ensure both fields are provided
    if (!location || !productType) {
        alert("Please enter both location and product type.");
        return;
    }

    // Send the request to Flask backend
    fetch('/recommendations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            location: location,
            product_type: productType
        })
    })
    .then(response => response.json())
    .then(data => {
        // Handle response
        let output = '';
        if (data.error) {
            output = `<p class="text-danger">${data.error}</p>`;
        } else {
            output = `
        <div class="card-panel teal lighten-5 z-depth-3" style="padding: 20px; border-radius: 12px;">
        <h4 class="center-align green-text text-darken-3" style="font-weight: bold; font-size: 1.8rem;">
            🌱 Eco-Friendly Recommendation
        </h4>
        <div class="divider" style="margin: 15px 0;"></div>
        <p><i class="material-icons left green-text text-darken-3"></i><strong> Location:</strong> 
           <span style="color: #1b5e20;">${data.Location}</span></p>
        <p><i class="material-icons left green-text text-darken-3"></i><strong> Packaging Material:</strong> 
           <span style="color: #2e7d32;">${data.Optimal_Packaging_Material}</span></p>
        <p><i class="material-icons left green-text text-darken-3"></i><strong> Carbon Footprint:</strong> 
           <span style="color: #388e3c;">${data['Carbon_Footprint (kg CO₂)']} kg CO2</span></p>
        <p><i class="material-icons left green-text text-darken-3"></i><strong> Biodegradability Score:</strong> 
           <span style="color: #4caf50;">${data.Biodegradability_Score} /10</span></p>
        <p><i class="material-icons left green-text text-darken-3"></i><strong> Recyclability Score:</strong> 
           <span style="color: #43a047;">${data.Recyclability_Score} /10</span></p>
        <p><i class="material-icons left green-text text-darken-3"></i><strong> Cost Efficiency:</strong> 
           <span style="color: #2e7d32;">${data.Cost_Efficiency} /3</span></p>
        <p><i class="material-icons left green-text text-darken-3"></i><strong> Availability:</strong> 
           <span style="color: #1b5e20;">${data.Availability} /3</span></p>
    </div>
`;

            if (data.Alternative_Location) {
                output += `<p><strong>Alternative Location:</strong> ${data.Alternative_Location}</p>`;
            }
        }
        document.getElementById('output').innerHTML = output;
    })
    .catch(error => {
        console.error(error);
        document.getElementById('output').innerHTML = '<p class="text-danger">An error occurred. Please try again.</p>';
    });
});
