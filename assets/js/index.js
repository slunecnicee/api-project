const url =`http://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline`;

async function getdata (){
try {
   const response = await fetch(url);
   return response.json();
  

} catch (error) {
   console.error(error);
}
}

getdata();




async function makeupCards() {
    try {
      const results = await getdata();
      results.forEach((item) => {
        const span = `<article class='items'>
                      <img src="${item.image_link}"/>
                      <p> ${item.name} </p>
                      
                      <div class="stars">
                        <span class="star" data-rating="1">&#9734;</span>
                        <span class="star" data-rating="2">&#9734;</span>
                        <span class="star" data-rating="3">&#9734;</span>
                        <span class="star" data-rating="4">&#9734;</span>
                        <span class="star" data-rating="5">&#9734;</span>
                      </div>
  
                      <div class="showmore">
                        <p>Brand: <a class="a1" href="https://www.maybelline.com/" target="_blank">${item.brand}</a></p>
                        <p>Price: ${item.price}</p>
                        <p>Rating: ${item.rating||5}</p>
                        <p>Description: ${item.description}</p>
                        <div class="colors"></div>
                        <a class="a2" href="./extra.html" target="_blank">Buy Product</a>
                      </div>
  
                      <footer>
                        <button onclick="toggleShowMore(this)">Read More</button>
                      </footer>
                    </article>`;
        root.innerHTML += span;
      });

      const colorContainers = document.getElementsByClassName("colors");

      Array.from(colorContainers).forEach((colorContainer, index) => {
        const item = results[index];
        const colors = item.product_colors;
        
        if (colors && colors.length > 0) {
        
          colors.forEach((color) => {
            const colorDiv = document.createElement("div");
            colorDiv.style.backgroundColor = color.hex_value;
            colorDiv.classList.add("color");
            colorContainer.appendChild(colorDiv);
          });
        }
      });
  
      const articles = document.querySelectorAll('.items');
      articles.forEach((article) => {
        const stars = article.querySelectorAll('.star');
        stars.forEach((star) => {
          star.addEventListener('click', () => {
            const rating = star.dataset.rating;
            stars.forEach((s) => {
              if (s.dataset.rating <= rating) {
                s.classList.add('filled');
              } else {
                s.classList.remove('filled');
              }
            });
          });
        });
      });
  
      const paragraphs = document.querySelectorAll('p');
      paragraphs.forEach((paragraph) => {
        const words = paragraph.textContent.trim().split(' ');
        if (words.length > 4) {
          paragraph.style.fontSize = '1.2rem';
        } else {
          paragraph.style.fontSize = '1.5rem';
        }
      });
    } catch (error) {
      console.error(error);
    }
  }
  
  function toggleShowMore(button) {
    const showMoreDiv = button.parentNode.parentNode.querySelector('.showmore');
    if (showMoreDiv.style.display === 'none') {
      showMoreDiv.style.display = 'flex';
      button.textContent = 'Read Less';
    } else {
      showMoreDiv.style.display = 'none';
      button.textContent = 'Read More';
    }
  }
  
  makeupCards();





  const products = document.querySelector('.products')
  const contact = document.querySelector('.contact')
  const comments = document.querySelector('.comments')
  const about = document.querySelector('.about')
  
  function toggleTabs() {
  
      products.style.display = 'flex';
      contact.style.display = 'none';
      comments.style.display = 'none';
      about.style.display = 'none';
      
    
      document.querySelector('.menu').addEventListener('click', event => {
        if (event.target.classList.contains('li1')) {
          switch (event.target.textContent) {
            case 'Producs':
              products.style.display = 'flex';
              contact.style.display = 'none';
              comments.style.display = 'none';
              about.style.display = 'none';
              break;
            case 'Register':
              products.style.display = 'none';
              contact.style.display = 'flex';
              comments.style.display = 'none';
              about.style.display = 'none';
              break;
            case 'Comments':
              products.style.display = 'none';
              contact.style.display = 'none';
              comments.style.display = 'flex';
              about.style.display = 'none';
              break;
            case 'About Us':
              products.style.display = 'none';
              contact.style.display = 'none';
              comments.style.display = 'none';
              about.style.display = 'flex';
              break;
            default:
              products.style.display = 'flex';
              contact.style.display = 'none';
              comments.style.display = 'none';
              about.style.display = 'none';
          }
        }
      });
    };
    
    toggleTabs();
  
    
  
    
    function handleSubmit(event) {
      event.preventDefault(); 
      
      
      let firstName = document.getElementById('fname').value;
      let lastName = document.getElementById('lname').value;
      let email = document.getElementById('email').value;
      let password = document.getElementById('password').value;
      let address = document.getElementById('address').value;
      let phoneNumber = document.getElementById('phone').value;
      let country = document.getElementById('country').value;
      let gender = document.querySelector('input[name="gender"]:checked').value;
      
     
      console.log('First Name:', firstName);
      console.log('Last Name:', lastName);
      console.log('Email:', email);
      console.log('Password:', password);
      console.log('Address:', address);
      console.log('Phone Number:', phoneNumber);
      console.log('Country:', country);
      console.log('Gender:', gender);
  
      document.getElementById('fname').value = '';
      document.getElementById('lname').value = '';
      document.getElementById('email').value = '';
      document.getElementById('password').value = '';
      document.getElementById('address').value = '';
      document.getElementById('phone').value = '';
      document.getElementById('country').value = '';
      document.querySelector('input[name="gender"]:checked').checked = false;
    
    };
  
  
    function appendComment() {
      const firstName = document.getElementById('first-name').value;
      const lastName = document.getElementById('last-name').value;
      const comment = document.getElementById('comment').value;
  
      const commentText = `${firstName} ${lastName}: ${comment}`;
  
      const commentContainer = document.getElementById('comment-container');
      const commentElement = document.createElement('div');
      commentElement.textContent = commentText;
      commentElement.classList.add('comment');
      commentContainer.appendChild(commentElement);
  
   
      let comments = localStorage.getItem('comments');
      if (comments) {
          comments = JSON.parse(comments);
      } else {
          comments = [];
      }
      comments.push(commentText);
      localStorage.setItem('comments', JSON.stringify(comments));
  }
  
  function loadComments() {
      let comments = localStorage.getItem('comments');
      if (comments) {
          comments = JSON.parse(comments);
          const commentContainer = document.getElementById('comment-container');
          for (let i = 0; i < comments.length; i++) {
              const commentElement = document.createElement('div');
              commentElement.textContent = comments[i];
              commentElement.classList.add('comment');
              commentContainer.appendChild(commentElement);
          }
      }
  }
  
  window.addEventListener('load', loadComments);

console.clear();