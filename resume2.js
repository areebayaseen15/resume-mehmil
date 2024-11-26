document.addEventListener('DOMContentLoaded', function () {
    // Toggle button functionality
    const toggleButtons = document.querySelectorAll('.toggle-button');

    toggleButtons.forEach(button => {
        button.addEventListener('click', function () {
            const targetId = button.getAttribute('data-target');
            const targetSection = document.getElementById(targetId);
            if (targetSection.style.display === 'none' || targetSection.style.display === '') {
                targetSection.style.display = 'block';
                button.textContent = 'Hide'; // Change text to Hide
            } else {
                targetSection.style.display = 'none';
                button.textContent = 'Show'; // Change text to Show
            }
        });
    });

    // Handle form submission
    document.getElementById('resumeForm').addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent the default form submission

        // Retrieve form values
        const username = document.getElementById('username').value;
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const number = document.getElementById('number').value;
        const education = document.getElementById('education').value;
        const experience = document.getElementById('experience').value;
        const skills = document.getElementById('skills').value;
        const profilePicInput = document.getElementById('profilePic');

        // Generate the resume output
        const resumeOutput = document.getElementById('resumeOutput');

        // Create a FileReader to read the image
        const reader = new FileReader();
        reader.onload = function (event) {
            const imgSrc = event.target.result; // Base64 image data

            // Unique resume URL
            const resumeUrl = `${window.location.origin}/resume/${username}`;

            // Resume HTML content
            resumeOutput.innerHTML = `
                <h2>Resume of ${name}</h2>
                <img src="${imgSrc}" alt="Profile Picture" style="width: 90px; height: 100px; border-radius: 50%;">
                <p><strong>Username:</strong> ${username}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Number:</strong> ${number}</p>
                <h3>Education</h3>
                <p>${education}</p>
                <h3>Experience</h3>
                <p>${experience}</p>
                <h3>Skills</h3>
                <p>${skills}</p>
                <h3>Share Your Resume</h3>
                <p>Share this link: <a href="${resumeUrl}" target="_blank">${resumeUrl}</a></p>
            `;

            // Add download button for PDF
            const downloadBtn = document.createElement('button');
            downloadBtn.textContent = 'Download as PDF';
            downloadBtn.className = 'btn';
            resumeOutput.appendChild(downloadBtn);

            downloadBtn.addEventListener('click', function () {
                const { jsPDF } = window.jspdf; // Assuming jsPDF is included via CDN
                const doc = new jsPDF();

                // Add the profile picture to PDF
                doc.addImage(imgSrc, 'PNG', 10, 10, 40, 40); // Position (10,10) and size (40x40)

                // Add text to PDF
                doc.text(`Resume of ${name}`, 10, 60);
                doc.text(`Username: ${username}`, 10, 70);
                doc.text(`Email: ${email}`, 10, 80);
                doc.text(`Number: ${number}`, 10, 90);
                doc.text('Education:', 10, 100);
                doc.text(education, 10, 110);
                doc.text('Experience:', 10, 130);
                doc.text(experience, 10, 140);
                doc.text('Skills:', 10, 160);
                doc.text(skills, 10, 170);

                doc.save(`${username}_resume.pdf`);
            });
        };

        // Read the uploaded image file
        if (profilePicInput.files && profilePicInput.files[0]) {
            reader.readAsDataURL(profilePicInput.files[0]); // Convert image to base64
        }
    });
});

// Function to update the original input fields when editing
function updateField(field, value) {
    document.getElementById(field).value = value; // Update the original input field
}
