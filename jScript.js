      function showTime() {
        const now = new Date();
        document.getElementById('currentTime').innerHTML = now.toLocaleString('en-US', {
          timeZone: 'Asia/Manila',
          dateStyle: 'full',
          timeStyle: 'medium'
        });
      }
      showTime();
      setInterval(showTime, 1000);

      const categoryGallery = {
        "Single Drawn": ["wefted1.png"],
        "Double Drawn Straight": [],
        "Natural Wavy": [],
        "Single Drawn Steam": [],
        "Double Drawn Steam": []
      };

      let currentSlideIndex = 0;
      let totalSlides = 0;

      const galleryImages = document.querySelectorAll('.container img');
      const categoryButtons = document.querySelectorAll('.category p');
      const aboutBtn = document.getElementById('aboutBtn');
      const contactBtn = document.getElementById('contactBtn');

      const customModal = document.getElementById('customModal');
      const modalImg = document.getElementById('modalImg');
      const sliderWrapper = document.getElementById('sliderWrapper');
      const sliderTrack = document.getElementById('sliderTrack');
      const sliderTitle = document.getElementById('sliderTitle');
      const sliderPagination = document.getElementById('sliderPagination');
      const prevBtn = document.getElementById('prevBtn');
      const nextBtn = document.getElementById('nextBtn');
      const aboutModalContent = document.getElementById('aboutModalContent');
      const contactModalContent = document.getElementById('contactModalContent');
      const thankyouModalContent = document.getElementById('thankyouModalContent');
      const closeThankYouBtn = document.getElementById('closeThankYouBtn');

      function hideAllModalViews() {
        modalImg.style.display = 'none';
        sliderWrapper.style.display = 'none';
        aboutModalContent.style.display = 'none';
        contactModalContent.style.display = 'none';
        thankyouModalContent.style.display = 'none';
      }

      categoryButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
          const categoryName = btn.getAttribute('data-category') || btn.textContent.trim();
          const images = categoryGallery[categoryName] || [];

          hideAllModalViews();
          sliderTitle.textContent = categoryName;

          sliderTrack.innerHTML = '';
          sliderPagination.innerHTML = '';
          currentSlideIndex = 0;
          totalSlides = images.length;

          if (totalSlides === 0) {
            prevBtn.style.display = 'none';
            nextBtn.style.display = 'none';
            sliderTrack.innerHTML = `<div class="no-images-msg">No images added to this category yet.</div>`;
          } else {
            prevBtn.style.display = 'flex';
            nextBtn.style.display = 'flex';

            images.forEach((imgSrc, index) => {
              const slide = document.createElement('div');
              slide.className = 'slider-slide';
              slide.innerHTML = `<img src="${imgSrc}" alt="${categoryName} Image ${index + 1}" />`;
              sliderTrack.appendChild(slide);

              const dot = document.createElement('span');
              dot.className = `dot ${index === 0 ? 'active' : ''}`;
              dot.addEventListener('click', () => goToSlide(index));
              sliderPagination.appendChild(dot);
            });
          }

          updateSlidePosition();
          sliderWrapper.style.display = 'flex';
          customModal.classList.add('active');
        });
      });

      function updateSlidePosition() {
        if (totalSlides > 0) {
          sliderTrack.style.transform = `translateX(-${currentSlideIndex * 100}%)`;
          const dots = sliderPagination.querySelectorAll('.dot');
          dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlideIndex);
          });
        } else {
          sliderTrack.style.transform = 'none';
        }
      }

      function goToSlide(index) {
        currentSlideIndex = index;
        updateSlidePosition();
      }

      prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (totalSlides <= 1) return;
        currentSlideIndex = (currentSlideIndex - 1 + totalSlides) % totalSlides;
        updateSlidePosition();
      });

      nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (totalSlides <= 1) return;
        currentSlideIndex = (currentSlideIndex + 1) % totalSlides;
        updateSlidePosition();
      });

      galleryImages.forEach((img) => {
        img.addEventListener('click', () => {
          hideAllModalViews();
          modalImg.style.display = 'block';
          modalImg.src = img.src;
          modalImg.alt = img.alt;
          customModal.classList.add('active');
        });
      });

      aboutBtn.addEventListener('click', () => {
        hideAllModalViews();
        aboutModalContent.style.display = 'block';
        customModal.classList.add('active');
      });

      contactBtn.addEventListener('click', () => {
        hideAllModalViews();
        contactModalContent.style.display = 'block';
        customModal.classList.add('active');
      });

      customModal.addEventListener('click', (e) => {
        if (e.target === customModal) {
          customModal.classList.remove('active');
        }
      });

      closeThankYouBtn.addEventListener('click', () => {
        customModal.classList.remove('active');
      });

      document.addEventListener('keydown', (e) => {
        if (!customModal.classList.contains('active')) return;

        if (e.key === 'Escape') {
          customModal.classList.remove('active');
        } else if (sliderWrapper.style.display === 'flex' && totalSlides > 1) {
          if (e.key === 'ArrowLeft') {
            currentSlideIndex = (currentSlideIndex - 1 + totalSlides) % totalSlides;
            updateSlidePosition();
          } else if (e.key === 'ArrowRight') {
            currentSlideIndex = (currentSlideIndex + 1) % totalSlides;
            updateSlidePosition();
          }
        }
      });

      const phoneLink = document.getElementById('phoneLink');
      if (phoneLink) {
        phoneLink.addEventListener('click', (e) => {
          e.preventDefault();
          const phoneNumber = '+63 955 025 9861';

          navigator.clipboard
            .writeText(phoneNumber)
            .then(() => {
              const icon = phoneLink.querySelector('i');
              const originalIconClass = icon.className;
              icon.className = 'fa-solid fa-check';

              let feedback = phoneLink.querySelector('.copy-feedback');
              if (!feedback) {
                feedback = document.createElement('span');
                feedback.className = 'copy-feedback';
                feedback.style.marginLeft = 'auto';
                feedback.style.fontSize = '12px';
                feedback.style.color = '#ffd700';
                feedback.textContent = 'Copied!';
                phoneLink.appendChild(feedback);
              }

              setTimeout(() => {
                icon.className = originalIconClass;
                if (feedback) {
                  feedback.remove();
                }
              }, 2000);
            })
            .catch((err) => {
              console.error('Failed to copy text: ', err);
            });
        });
      }

     
      const inquiry = document.getElementById('inquireBtn');
      const sendBtn = document.getElementById('sendButton');
      const orderDiv = document.getElementById('orderCont');

      inquiry.onclick = function () {
        if (orderDiv.style.display === 'flex') {
          orderDiv.style.display = 'none';
        } else {
          orderDiv.style.display = 'flex';
          
          
          requestAnimationFrame(() => {
            const yOffset = -30; 
            const y = orderDiv.getBoundingClientRect().top + window.pageYOffset + yOffset;
            
            window.scrollTo({
              top: y,
              behavior: 'smooth'
            });
          });
        }
      };

      sendBtn.onclick = function () {
        const orderText = document.getElementById('textField');
        const email = document.getElementById('email');
        const contactNum = document.getElementById('contact-number');
        const address = document.getElementById('address');
        const firstName = document.getElementById('firstName');
        const lastName = document.getElementById('lastName');

        if (!email || !contactNum || !address) {
          alert('Please fill in your Email, Contact Number, and Full Address.');
          return;
        }
        else{
          const formspreeUrl = "https://formspree.io/f/mgogdlqo"; 

            fetch(formspreeUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    message: "Email"+email.value+"\nContact: "+contactNum.value+"\nFirstname: "+firstName.value+"\nLastname: "+lastName.value+"\nAddress: "+address.value+"\n\n\nORDER: "+orderText.value
                })
            }).then(response => {
                if (response.ok) {
                  
                    console.log("Submitted");
                    alert("Thank You for submitting your order request. We'll reach you out to confirm the order!")
                  
                } else {
                    console.error("Failed.");
                }
            }).catch(err => console.error("Error", err));

        }

        

            
      };
