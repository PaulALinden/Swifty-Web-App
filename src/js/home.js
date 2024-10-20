import config from '../js/config';

const companyList = document.getElementById('companylist');

async function getCompanyData() {
    const apiUrl = `http://${config.BASE_URL}:3000/api/firebase/data?path=companies`

    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            console.log('Network response was not ok ' + response.statusText);
            console.log(response)
            throw new Error('Couldnt fetch data');
        } else {
            const data = await response.json();
            console.log('Success:', data);

            const company = Object.values(data);
            company.forEach(company => {
                let companyInfo = company.info;

                let companyDiv = document.createElement('div');
                companyDiv.className = 'company';
                companyList.append(companyDiv);
 
                let image = document.createElement('img');
                image.src = companyInfo.url;
 
                companyDiv.append(image);
            });
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

getCompanyData();
