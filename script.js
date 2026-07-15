/* ============================================================================
   CHILL VIBES — script.js
   ----------------------------------------------------------------------------
   All the interactive behaviour of the site lives in this single file.
   No frameworks, no build step, no backend.

   SECTIONS
     1. MENU_CATEGORIES → the data that builds the Menu section
                          (each drink has:  num, name, tagline, desc, full, img)
     2. renderMenu()    → turns the data into HTML cards
     3. openMenuModal() → shows a big "detail" popup when a card is clicked
     4. Header scroll effect
     5. Mobile navigation toggle
     6. Footer year
     7. Enquiry form  →  opens the user's email app with a prefilled message
     8. Scroll-reveal animation
     9. DOMContentLoaded → boots everything

   HOW TO EDIT THE MENU
     Each item in MENU_CATEGORIES has:
       num     — number from the original menu book (small label on card)
       name    — displayed name of the drink
       tagline — short one-line hook shown in the modal (below the name)
       desc    — short 1-line description shown on the CARD
       full    — long description shown in the popup MODAL when clicked
                 (ingredients + what makes it special)
       img     — path to the drink photo (files live in images/menu/)
   ============================================================================ */


/* ------------------------------------------------------------------
   1) MENU DATA
   ------------------------------------------------------------------ */
const MENU_CATEGORIES = [
  {
    title:   "Signature Mocktails",
    tagline: "House-crafted, alcohol-free.",
    index:   "01",
    items: [
      {
        num: 7, name: "Wicked Witch",
        tagline: "Dark, fizzy, mysterious.",
        desc: "Blueberry crush, citric zest, topped with cola.",
        full: "A visually striking, dark-hued mocktail that blends the rich sweetness of blueberry crush with the tangy sharpness of citric acid, balanced perfectly by the fizzy caramel notes of cola on top. The deep purple-blue color from the blueberry crush creates an almost mystical appearance, contrasted by the dark cola layer. Served chilled in a tall glass with ice — an eye-catching, flavorful beverage perfect for a themed party or anyone who loves fruity, sweet, fizzy mocktails.\n\nIngredients: Blueberry crush · Citric acid · Cola · Ice",
        img: "images/07_wicked-witch.jpeg"
      },
      {
        num: 20, name: "Vampire's Kiss",
        tagline: "Sweet, sharp, cinematic.",
        desc: "Grenadine, pomegranate seeds, ginger ale.",
        full: "Deep red sweetness of grenadine syrup and pomegranate seeds combined with the crisp, spicy carbonation of ginger ale. The pomegranate seeds add bursts of tart flavor and a jewel-like appearance, while the grenadine creates a rich, ruby-red color reminiscent of a vampire's mythical allure. Bubbly, refreshing, and beautifully balanced between sweet and sharp — garnished with pomegranate seeds and a twist of citrus peel.\n\nIngredients: Grenadine syrup · Pomegranate seeds · Ginger ale · Ice · Citrus peel",
        img: "images/vampire_kiss"
      },
      {
        num: 4, name: "My Valentine",
        tagline: "Pale pink and elegant.",
        desc: "Lychee, rose, citric acid.",
        full: "Made with lychee juice, rose, and a touch of citric acid — presented in a clear glass showcasing a delicate pale-pink hue from the lychee and rose. Garnished with edible rose buds, fresh lychees, and mint leaves. Floral, elegant, and delicately sweet.\n\nIngredients: Lychee juice · Rose syrup · Citric acid · Mint · Rose buds",
        img: "images/04_my-valentine.jpeg"
      },
      {
        num: 18, name: "Golden Sunset",
        tagline: "A glowing tropical pour.",
        desc: "Pineapple, banana crush, citric zest.",
        full: "Sweet and tangy pineapple juice blended with smooth, creamy banana crush, balanced by a hint of citric acid for a fresh, zesty kick. The vibrant golden-yellow color combines the hues of both fruits, evoking a glowing sunset. Lush texture, tropical burst — served chilled with a pineapple wedge or banana slice.\n\nIngredients: Pineapple juice · Banana crush · Citric acid · Ice",
        img: "images/18_golden-sunset.jpeg"
      },
      {
        num: 5, name: "Coastal Cooler",
        tagline: "Beachy summer vibes.",
        desc: "Peach syrup, pineapple, orange.",
        full: "Combines the sweetness of peach syrup with the tropical tang of pineapple juice and the citrusy zing of orange juice. The vibrant orange-peach color makes it visually appealing, evoking a beachy, summer feel. Served chilled in a tall glass with ice, garnished with slices of peach, pineapple chunks, or orange wedges, and sometimes fresh mint.\n\nIngredients: Peach syrup · Pineapple juice · Orange juice · Ice · Mint",
        img: "images/05_coastal-cooler.jpeg"
      },
      {
        num: 28, name: "Dariyanchi Lara",
        tagline: "Ocean-blue, floral, cool.",
        desc: "Lychee, blue curaçao, citric acid.",
        full: "A stunning mocktail crafted with lychee juice, a touch of citric acid for tangy zest, and a splash of blue curaçao syrup that resembles mesmerizing ocean waves. Combines the sweet, floral, tropical flavor of lychee with the citrusy brightness of citric acid — a cool, revitalizing experience reminiscent of a serene seaside escape.\n\nIngredients: Lychee juice · Blue curaçao syrup · Citric acid · Ice",
        img: "images/28_dariyanchi-lara.jpeg"
      },
      {
        num: 12, name: "Rasmalai",
        tagline: "Dessert in a glass.",
        desc: "Mango, cream, saffron strands.",
        full: "Captures the essence of the rasmalai dessert by blending ripe, sweet mango juice with luxurious cream and delicate saffron strands. The saffron adds a beautiful golden hue and subtle floral aroma that complements the fruity sweetness. Smooth, indulgently creamy, and thick — garnished with saffron strands or pistachio slivers.\n\nIngredients: Mango juice · Cream · Saffron · Pistachio",
        img: "images/12_rasmalai.jpeg"
      },
      {
        num: 10, name: "Jack Frost",
        tagline: "Frothy purple velvet.",
        desc: "Lychee & blackcurrant crush, shaken to a frothy velvet.",
        full: "Combines the sweet floral notes of lychee juice with the deep, tart flavor of blackcurrant crush, brightened by citric acid. Shaken vigorously to create a creamy, frothy texture with a rich purple hue. Smooth and velvety — served chilled in a cocktail glass and garnished with lychee, blackcurrants, or fresh mint.\n\nIngredients: Lychee juice · Blackcurrant crush · Citric acid · Ice",
        img: "images/10_jack-frost.jpeg"
      },
    ],
  },
  {
    title:   "Refreshers & Coolers",
    tagline: "Bright, cold, easy to drink.",
    index:   "02",
    items: [
      {
        num: 2, name: "Watermelon Mojito",
        tagline: "Refreshing, vibrant, minty.",
        desc: "Watermelon chunks, mint, lime, sparkling water.",
        full: "A refreshing, vibrant pink-red drink served in a tall glass with watermelon chunks, plenty of fresh mint leaves, and slices of lime or lemon — topped with sparkling water for a lively fizz.\n\nIngredients: Watermelon · Mint · Lime · Sparkling water · Ice",
        img: "images/02_water-melon-mojito.jpeg"
      },
      {
        num: 14, name: "Blueberry Mojito",
        tagline: "Colorful & summery.",
        desc: "Muddled blueberries, lime, mint, soda.",
        full: "Muddled fresh blueberries release a bright purple juice, blended with the sharp tang of freshly-squeezed lime and refreshing mint leaves. Lightly sweetened, served over ice, then topped with soda water for a bubbly finish. Garnished with additional blueberries, lime slices, and mint sprigs.\n\nIngredients: Blueberries · Lime · Mint · Sugar · Soda water",
        img: "images/14_blueberry-mojito.jpeg"
      },
      {
        num: 15, name: "Cucumber Fizz",
        tagline: "Crisp, floral, elegant.",
        desc: "Cucumber, lime, elderflower, sparkling top.",
        full: "Fresh cucumber juice blended with lime juice and elderflower syrup for a floral sweetness, topped with sparkling soda. Served in a tall glass with ice and garnished with cucumber ribbons, lime slices, and sometimes edible flowers or fresh mint. Cool, crisp, and elegantly flavorful.\n\nIngredients: Cucumber · Lime · Elderflower syrup · Sparkling soda",
        img: "images/15_cucumber-fizz.jpeg"
      },
      {
        num: 6, name: "Kiwi Cooler",
        tagline: "Bright green, tangy, tropical.",
        desc: "Crushed kiwi, pineapple, mint.",
        full: "Tangy, sweet kiwi blended with the tropical sweetness of pineapple juice. Served chilled in a tall glass over ice, garnished with slices of kiwi and pineapple, and sometimes fresh mint leaves. The kiwi is muddled to release its vibrant flavor and texture.\n\nIngredients: Kiwi · Pineapple juice · Mint · Ice",
        img: "images/06_kiwi-cooler.jpeg"
      },
      {
        num: 25, name: "Peach Ice Tea",
        tagline: "Hydrating, lightly sweet.",
        desc: "Cold-brewed tea, peach slices.",
        full: "Brewed black or green tea infused with real peach slices or peach syrup, sometimes lightly sweetened with sugar or honey. Served chilled over ice and garnished with fresh peach slices, mint, or lemon. Combines the smoothness of tea with the juicy sweetness of peach.\n\nIngredients: Tea · Peach · Honey · Ice · Mint / Lemon",
        img: "images/25_peach-ice-tea.jpeg"
      },
      {
        num: 24, name: "Virgin Mojito",
        tagline: "The classic, refreshed.",
        desc: "Lime, mint, sugar, soda.",
        full: "Captures the classic flavours of a traditional mojito without any alcohol — fresh lime juice, muddled mint, a light sweetener, and sparkling water or soda over ice. Bright, aromatic, and thoroughly refreshing.\n\nIngredients: Lime · Mint · Sugar / Honey · Soda water · Ice",
        img: "images/24_virgin-mojito.jpeg"
      },
      {
        num: 26, name: "Strawberry Daiquiri",
        tagline: "Slushy summer treat.",
        desc: "Blended strawberries, lime.",
        full: "A refreshing, non-alcoholic version of the classic — fresh or frozen strawberries blended with lime juice and a light sweetener. Instead of rum, we use lemon-lime soda or sparkling water for fizz. Blended with ice to a smooth, slushy consistency and garnished with fresh strawberry slices and a lime wedge.\n\nIngredients: Strawberries · Lime · Sugar syrup · Lemon-lime soda · Ice",
        img: "images/26_strawberry-daiquiri.jpeg"
      },
      {
        num: 29, name: "Passionate Apple",
        tagline: "Fruity, exotic, invigorating.",
        desc: "Apple juice, passionfruit syrup, citric lift.",
        full: "Crisp apple juice blended with sweet and tangy passionfruit syrup, balanced with a hint of citric acid for a lively, refreshing zest. Harmonious fusion of the natural sweetness of apple and the exotic tropical notes of passionfruit — bright, invigorating, and perfect for any season.\n\nIngredients: Apple juice · Passionfruit syrup · Citric acid · Ice",
        img: "images/29_passionate-apple.jpeg"
      },
      {
        num: 30, name: "Pineapple Bliss",
        tagline: "Bright tropical escape.",
        desc: "Pineapple, passionfruit, citrus.",
        full: "Sweet and tangy pineapple juice blended with vibrant passionfruit syrup, balanced with a touch of citric acid for a zesty kick. Tropical-inspired, refreshing, promising a burst of sunshine in every sip.\n\nIngredients: Pineapple juice · Passionfruit syrup · Citric acid · Ice",
        img: "images/30_pineapple-bliss.jpeg"
      },
    ],
  },
  {
    title:   "Desi Twists",
    tagline: "Rooted in Indian flavour.",
    index:   "03",
    items: [
      {
        num: 17, name: "Aam Panna",
        tagline: "Cooling summer classic.",
        desc: "Raw mango, roasted cumin, black salt, mint.",
        full: "Made by boiling raw green mangoes and blending their pulp with sugar or jaggery, roasted cumin powder, black salt, and fresh mint. Diluted with chilled or sparkling water, shaken well, served over ice. Vibrant yellow-green with a balance of sweet, sour, and salty flavors wrapped in earthy spices. A nutrient-rich mocktail that refreshes, hydrates, and aids digestion during hot summers.\n\nIngredients: Raw mango pulp · Jaggery / Sugar · Roasted cumin · Black salt · Mint · Water",
        img: "images/17_amm-panna.jpeg"
      },
      {
        num: 3, name: "Cumin Spice",
        tagline: "Earthy, tangy, cooling.",
        desc: "Cumin, mint, tamarind, lime — topped with cola.",
        full: "An earthy, tangy mocktail similar to Indian summer classics like jaljeera. Amber to light-green in color due to the combination of cumin, mint, tamarind, and lime — topped with cola for a fizzy finish. Garnished with fresh mint leaves, lemon slices, and a light sprinkle of cumin powder.\n\nIngredients: Cumin powder · Mint · Tamarind · Lime · Cola · Ice",
        img: "images/03_cumin-spice.jpeg"
      },
      {
        num: 13, name: "Rasiila Aam",
        tagline: "Floral mango charmer.",
        desc: "Ripe mango, rose syrup, citric zing.",
        full: "Tropical sweetness of ripe mango juice combined with the floral and aromatic notes of rose syrup, balanced by the tangy zest of citric acid. Vibrant orange-pink color, smooth texture, served chilled over ice. Cooling and thirst-quenching with a beautiful, inviting appearance.\n\nIngredients: Ripe mango juice · Rose syrup · Citric acid · Ice",
        img: "images/13_rasiila-amm.jpeg"
      },
      {
        num: 11, name: "Spiced Tamarind Punch",
        tagline: "Sweet, tangy, a hint of heat.",
        desc: "Pineapple, tamarind, a whisper of Tabasco.",
        full: "Pineapple juice blended with tamarind sauce for a unique balance of sweet and tangy, while Tabasco adds a spicy heat that elevates the drink's complexity. Shaken well and served chilled over ice — deep reddish-brown from the tamarind, bright from the pineapple. Garnished with lime wedges and mint.\n\nIngredients: Pineapple juice · Tamarind · Tabasco · Lime · Mint · Ice",
        img: "images/11_spiced-tamarind-punch.jpeg"
      },
      {
        num: 19, name: "Ajji Shonti",
        tagline: "Spice-warm, citrus-bright.",
        desc: "Fresh ginger, lime, sparkling water.",
        full: "Spicy warmth of fresh ginger syrup with the bright, citrusy tang of lime syrup, topped with sparkling water for a bubbly, crisp texture. Balanced and refreshing — served over ice in a tall glass, garnished with a slice of lime or lime peel, and sometimes a sprig of mint.\n\nIngredients: Ginger syrup · Lime syrup · Sparkling water · Ice · Mint",
        img: "images/19_ajji-shonti.jpeg"
      },
      {
        num: 23, name: "Ananthmool",
        tagline: "Ayurvedic and cooling.",
        desc: "Ayurvedic ananthmool root, citric acid, sparkling water.",
        full: "Made from a blend of Ananthmool root extract and citric acid, topped with sparkling water. The Ananthmool root, known for its medicinal and cooling properties in Ayurveda, gives the drink a unique sweet-bitter taste with a soothing herbal aroma. Citric acid adds a tangy zest that balances the natural earthiness of the root.\n\nIngredients: Ananthmool root extract · Citric acid · Sparkling water · Ice",
        img: "images/23_ananthmool.jpeg"
      },
      {
        num: 22, name: "Spicy Guava",
        tagline: "Bold, tropical, fiery.",
        desc: "Guava juice, Tabasco, chili-lime rim.",
        full: "A bold and flavorful non-alcoholic drink that combines the sweet, tropical essence of guava with a spicy kick from Tabasco. Chilled guava juice as the base, mixed with a few drops of Tabasco for heat and tanginess. The glass is rimmed with chili-lime seasoning, enhancing the spicy experience from the first sip.\n\nIngredients: Guava juice · Tabasco · Chili-lime seasoning · Ice",
        img: "images/22_spicy-guava.jpeg"
      },
    ],
  },
  {
    title:   "Classic Non-Alcoholic",
    tagline: "Timeless pours, reimagined.",
    index:   "04",
    items: [
      {
        num: 21, name: "Virgin Piña Colada",
        tagline: "Creamy tropical escape.",
        desc: "Pineapple, coconut cream, blended over ice.",
        full: "Non-alcoholic tropical drink containing pineapple juice, coconut cream or coconut milk, and ice — resulting in a creamy, icy, and sweet beverage. Meant to evoke the flavors of the classic Piña Colada without the rum. Garnished with pineapple wedges, maraschino cherries, or decorative umbrellas for a summery, vacation-like feel.\n\nIngredients: Pineapple juice · Coconut cream · Ice · Cherry",
        img: "images/21_virgin-pina-coloda.jpeg"
      },
      {
        num: 8, name: "Cinderella",
        tagline: "Bright, sweet, celebratory.",
        desc: "Orange, lemon, pineapple, grenadine, sparkling finish.",
        full: "Freshly squeezed orange juice, lemon juice, and pineapple juice, sweetened with grenadine syrup, and topped with sparkling water, ginger ale, or club soda. The grenadine adds a beautiful red hue and sweetness, while the citrus juices provide a bright and zesty flavor. Chilled with ice, garnished with fresh slices of pineapple, orange, and lemon.\n\nIngredients: Orange juice · Lemon juice · Pineapple juice · Grenadine · Sparkling water · Ice",
        img: "images/08_cinderella.jpeg"
      },
      {
        num: 16, name: "Shirley Temple — Twist Edition",
        tagline: "A classic, reinvented.",
        desc: "Pomegranate, ginger syrup, mint, ginger ale.",
        full: "Originally created in the 1930s for the child actress Shirley Temple. Our version brings a refreshing new take: fresh pomegranate seeds add a ruby sparkle and burst of flavor, while a ginger-infused syrup lends warmth and spice. Balanced with cool mint leaves and topped with crisp ginger ale — the perfect harmony of sweet, tangy, and zesty notes.\n\nIngredients: Pomegranate seeds · Ginger syrup · Mint · Ginger ale · Ice",
        img: "images/16_shirley-temple-twist-edition.jpeg"
      },
      {
        num: 1, name: "Green Apple Margarita",
        tagline: "Crisp, tart, refreshing.",
        desc: "Green apple, lime, salted rim, sparkling top.",
        full: "Vibrant green color, served in a chilled margarita glass, garnished with a slice of green apple and sometimes a cinnamon stick or salted rim — topped up with sparkling water for a lively finish.\n\nIngredients: Green apple juice · Lime · Salt (rim) · Sparkling water · Ice",
        img: "images/01_green-apple-margarita.jpeg"
      },
      {
        num: 9, name: "Fruit Punch",
        tagline: "Frothy fruit indulgence.",
        desc: "Guava, mixed fruits, vanilla, strawberry crush.",
        full: "Sweet, tangy notes of guava and mixed fruit juices blended with the smooth creaminess of vanilla ice cream and fresh strawberry crush. Blended to a frothy, silky consistency — refreshing yet indulgent. Served chilled in a tall glass, garnished with fresh strawberries, mint leaves, or fruit slices.\n\nIngredients: Guava juice · Mixed fruit juices · Vanilla ice cream · Strawberry crush · Mint",
        img: "images/09_fruit-punch.jpeg"
      },
      {
        num: 27, name: "Virgin Sangria",
        tagline: "Festive, fruity, chilled.",
        desc: "Blueberry, cranberry, chopped apple.",
        full: "A blend of blueberry crush, cranberry juice, and other fruit juices, usually served chilled. Garnished with chopped apple pieces on top for a crisp, fresh texture and burst of natural sweetness. Combines the tartness of cranberry, the subtle sweetness of blueberry, and the fresh crunch of apple.\n\nIngredients: Blueberry crush · Cranberry juice · Mixed fruit juices · Apple · Ice",
        img: "images/27_virgin-sangria.jpeg"
      },
    ],
  },
];


/* ------------------------------------------------------------------
   2) renderMenu()
   Takes the array above and writes matching HTML into the page.
   Also stores each drink's data on its card so the modal can read it.
   ------------------------------------------------------------------ */
function renderMenu() {
  const wrap = document.getElementById('menuCategories');
  if (!wrap) return;

  const html = MENU_CATEGORIES.map(cat => `
    <div class="menu-category reveal" data-testid="menu-category-${cat.index}">

      <!-- Category header -->
      <div class="menu-cat-head">
        <div>
          <h3>${cat.title}</h3>
          <p class="script">${cat.tagline}</p>
        </div>
        <span class="cat-index">${cat.index}</span>
      </div>

      <!-- Cards for each drink in this category -->
      <div class="menu-items">
        ${cat.items.map((it, i) => `
          <article
            class="menu-card"
            data-cat="${cat.index}" data-idx="${i}"
            data-testid="menu-item-${it.name.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')}"
            tabindex="0"
            role="button"
          >
            <div class="menu-card-media">
              <img src="${it.img}" alt="${it.name}" loading="lazy" />
            </div>
            <div class="menu-card-body">
              <span class="menu-card-num">No. ${String(it.num).padStart(2,'0')}</span>
              <h4>${it.name}</h4>
              <p>${it.desc}</p>
            </div>
          </article>
        `).join('')}
      </div>
    </div>
  `).join('');

  wrap.innerHTML = html;

  // Wire up click / keyboard "open modal" on every card
  wrap.querySelectorAll('.menu-card').forEach(card => {
    const cat = card.getAttribute('data-cat');
    const idx = parseInt(card.getAttribute('data-idx'), 10);
    const catObj = MENU_CATEGORIES.find(c => c.index === cat);
    const item = catObj ? catObj.items[idx] : null;
    if (!item) return;
    const open = () => openMenuModal(item);
    card.addEventListener('click', open);
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); }
    });
  });
}


/* ------------------------------------------------------------------
   3) MENU DETAIL MODAL
   Fills the hidden modal with the drink's details and shows it.
   Closes when the user clicks the backdrop, the × button, or presses Esc.
   ------------------------------------------------------------------ */
function openMenuModal(item) {
  const modal    = document.getElementById('menuModal');
  const imgEl    = document.getElementById('modalImg');
  const numEl    = document.getElementById('modalNum');
  const nameEl   = document.getElementById('modalName');
  const tagEl    = document.getElementById('modalTagline');
  const descEl   = document.getElementById('modalDesc');
  if (!modal || !item) return;

  imgEl.src         = item.img;
  imgEl.alt         = item.name;
  numEl.textContent = `No. ${String(item.num).padStart(2,'0')}`;
  nameEl.textContent = item.name;
  tagEl.textContent  = item.tagline || '';
  descEl.textContent = item.full || item.desc || '';

  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeMenuModal() {
  const modal = document.getElementById('menuModal');
  if (!modal) return;
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

function initModal() {
  const modal = document.getElementById('menuModal');
  if (!modal) return;
  // Any element inside modal with data-close="1" closes the modal
  modal.addEventListener('click', (e) => {
    if (e.target.getAttribute('data-close') === '1') closeMenuModal();
  });
  // Esc key also closes
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenuModal();
  });
}


/* ------------------------------------------------------------------
   4) HEADER SCROLL EFFECT
   Adds .scrolled once the user has scrolled 40px down.
   The CSS then blurs / tints the header background.
   ------------------------------------------------------------------ */
const header = document.getElementById('siteHeader');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) header.classList.add('scrolled');
  else                     header.classList.remove('scrolled');
});


/* ------------------------------------------------------------------
   5) MOBILE NAVIGATION TOGGLE
   ------------------------------------------------------------------ */
const toggle = document.getElementById('navToggle');
if (toggle) {
  toggle.addEventListener('click', () => {
    header.classList.toggle('menu-open');
    toggle.classList.toggle('open');
  });
}


/* ------------------------------------------------------------------
   6) FOOTER YEAR
   ------------------------------------------------------------------ */
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();


/* ------------------------------------------------------------------
   7) ENQUIRY FORM  (mailto: — no backend)
   → CHANGE THE RECIPIENT EMAIL HERE
   ------------------------------------------------------------------ */
const OWNER_EMAIL = 'mailto:chillvibescocktails@gmail.com'; // ← put your inbox here

function initForm() {
  const form = document.getElementById('enquiryForm');
  const note = document.getElementById('formNote');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Collect all field values into a plain object
    const data = Object.fromEntries(new FormData(form).entries());

    // Basic validation
    if (!data.name || !data.phone || !data.email
        || !data.event_date || !data.guests || !data.event_type) {
      note.textContent = 'Please fill all required fields.';
      note.className = 'form-note error';
      return;
    }

    const subject = encodeURIComponent(`Event Enquiry — ${data.name} (${data.event_type})`);
    const body = encodeURIComponent(
`Name: ${data.name}
Phone: ${data.phone}
Email: ${data.email}
Event Date: ${data.event_date}
Guests: ${data.guests}
Event Type: ${data.event_type}

Message:
${data.message || '-'}`
    );

    window.location.href = `mailto:${OWNER_EMAIL}?subject=${subject}&body=${body}`;

    note.textContent = 'Opening your email app… If nothing happens, email us at ' + OWNER_EMAIL;
    note.className = 'form-note success';
    form.reset();
  });
}


/* ------------------------------------------------------------------
   8) SCROLL-REVEAL ANIMATION + mobile-nav close on link click
   ------------------------------------------------------------------ */
function initInteractions() {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  document.querySelectorAll('.nav-links a').forEach(a => {
    a.addEventListener('click', () => {
      header.classList.remove('menu-open');
      if (toggle) toggle.classList.remove('open');
    });
  });
}


/* ------------------------------------------------------------------
   9) BOOT
   ------------------------------------------------------------------ */
document.addEventListener('DOMContentLoaded', () => {
  renderMenu();
  initForm();
  initInteractions();
  initModal();
});
