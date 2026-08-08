# Our Love Story

Build a complete cute romantic interactive love-proposal web app called "Our Little Love Story".

IMPORTANT:

- Build the entire app in ONE implementation.

- Do not create unnecessary backend, database, authentication, API calls, or external services.

- This is a frontend-only interactive experience.

- Keep the code clean, lightweight, responsive and production-ready.

- Use React + Vite + Tailwind CSS.

- Use CSS animations and lightweight React state for interactions.

- Do NOT add a navbar, dashboard, login page, sidebar, footer, admin panel, or unnecessary pages.

- The experience should feel like a premium romantic mobile-first website.

- Make it work beautifully on iPhone/mobile and desktop.

- Use smooth page transitions between every step.

- Avoid excessive animations that hurt performance.

DESIGN STYLE:

Create a dreamy romantic aesthetic using:

- Dark rose / burgundy / pink gradient background

- Colors around #160812, #2A0718, #5C1236, #8F1D50, soft pink highlights

- Soft glowing pink light effects

- Floating hearts in the background

- Tiny sparkles/stars

- Glassmorphism cards

- Rounded corners

- Soft shadows and pink glow

- Elegant typography

- Romantic but modern, NOT childish

- Premium Instagram/Pinterest-style aesthetic

- Large readable text

- Beautiful spacing

- Mobile-first layout

BACKGROUND:

Use a full-screen animated dark rose gradient.

Add subtle floating hearts that slowly move upward with different sizes, opacity and speeds.

Add a few tiny glowing particles.

Keep animations smooth and lightweight.

Do not make the background distracting.

APP FLOW:

STEP 1 — LOVE.EXE LOADING SCREEN

Show a centered romantic loading screen.

Display:

"Initializing Love.exe..."

Then a large percentage counter:

0% → 100%

Below it show a sleek glowing progress bar.

The status text should change during loading:

"Searching for someone special..."

"Scanning memories..."

"Checking compatibility..."

"Almost there..."

"Found 1 Result ❤️"

At 100%, show:

"Found 1 Result ❤️"

Then automatically transition to the next screen after a short delay.

Use a smooth fade/scale transition.

Do not make the loading take too long. Approximately 3–4 seconds.

--------------------------------------------------

STEP 2 — LETTER ARRIVED

Show a beautiful centered envelope.

Text:

"A letter arrived 💌"

Subtitle:

"Tap the envelope to open it."

The envelope should look elegant and interactive:

- cream/white envelope

- pink/red heart seal

- subtle floating animation

- soft glow

- slight tilt/scale when hovered

- tap animation on mobile

When clicked, animate the envelope opening.

After opening, reveal the first message card.

--------------------------------------------------

STEP 3 — ROMANTIC LETTER

Show a glassmorphism letter/message card.

Only show ONE message at a time.

Include a progress indicator such as:

01 / 03

Message 1:

"Hey Jaan... Pata hai...

Main ye sab normally bol nahi pata...

but there are some things I really want you to know. ❤️"

Button:

"Next 💗"

Message 2:

"Jab bhi tum online aati ho...

mera mood automatically better ho jata hai.

It's actually crazy how one person can make such a difference. 🥹❤️"

Button:

"Continue 💕"

Message 3:

"Honestly...

Tum meri life ki sabse pyari coincidence ho.

Aur shayad meri favorite coincidence too. ❤️"

Button:

"There's something I want to ask you..."

Use smooth slide/fade animations between messages.

--------------------------------------------------

STEP 4 — CUTE DATE QUESTIONS

Heading:

"Okay... ek choti si baat poochu? 🥺"

Subtitle:

"Imagine it's just you and me..."

Create beautiful interactive cards.

QUESTION 1:

"Coffee Date? ☕"

Buttons:

"YES ❤️"

"OF COURSE ☕"

Either button should count as a positive answer.

After clicking, show a tiny cute confirmation:

"I knew it. Coffee tastes better with you. ☕❤️"

Then continue.

QUESTION 2:

"Long Walk? 🌙"

Buttons:

"YES ❤️"

"ALWAYS ♾️"

After clicking:

"Then let's get lost in conversations. 🌙❤️"

QUESTION 3:

"Late Night Talks? 🌙✨"

Buttons:

"100% ❤️"

"FOREVER ♾️"

After clicking:

"Those are my favorite kind of nights. 🥹"

Then show:

"Okay... one last question."

Button:

"Ask me 💗"

--------------------------------------------------

STEP 5 — ULTIMATE PROPOSAL

Make this screen visually more dramatic and romantic.

Add a glowing heart behind the content.

Heading:

"Okay Jaan... ❤️"

Main question:

"Kya Tum Meri Girlfriend Banogi? ❤️"

Subtitle:

"Think carefully... this question is very important. 🥺"

Show two buttons:

"YES ❤️"

"Shayad Nahi 🙈"

IMPORTANT INTERACTION:

The "Shayad Nahi 🙈" button should be playful rather than frustrating.

When the user tries to click it:

- First attempt: button moves slightly and text changes to "Sure? 🥺"

- Second attempt: "Ek baar aur soch lo 🥹"

- Third attempt: "Please? 😭❤️"

- Fourth attempt: "Nice try 😭"

- Then it moves away again.

On desktop it can move within the safe visible area.

On mobile, DO NOT make the button impossible to tap or move outside the screen.

Instead, simply change its text and gently shift its position.

Eventually the negative button should transform into:

"Okay YES ❤️"

Clicking it should trigger the success screen.

--------------------------------------------------

STEP 6 — CELEBRATION / SUCCESS

When YES is clicked:

Create a beautiful celebration.

Trigger:

- lots of floating hearts

- heart burst/confetti

- glowing heart animation

- subtle sparkle animation

- smooth scale-in animation

- celebratory background glow

Show:

"Yayyyyyyyyyy 💕"

Then:

"Officially... Ab tum meri favorite notification ho. ❤️"

Then:

"I promise...

Har smile ki wajah banne ki puri koshish karunga. 🥹❤️"

Add a beautiful glowing heart.

Then show button:

"Welcome to Our Story 💗"

--------------------------------------------------

STEP 7 — OUR STORY / TOGETHER COUNTER

When "Welcome to Our Story 💗" is clicked, show a final romantic screen.

Heading:

"Welcome to Our Story ❤️"

Subtitle:

"And this is just the beginning..."

Show:

"Together Since"

Create a live-updating counter displaying:

XX Days

XX Hours

XX Minutes

XX Seconds

IMPORTANT:

Create a single editable constant at the top of the React component such as:

const togetherSince = new Date("2026-XX-XXT00:00:00");

Make this easy to change later.

Calculate the elapsed time dynamically using JavaScript.

Below the counter show:

"Every second with you is my favorite second. ❤️"

Then:

"Here's to us. 🥂💕"

Add a button:

"Replay Our Story ↻"

Clicking it should restart the entire experience from the Love.exe loading screen.

--------------------------------------------------

INTERACTION & UX REQUIREMENTS:

Use React state to control all screens.

Suggested states:

loading

envelope

letter

questions

proposal

success

story

Do NOT create separate routes/pages for every step.

Everything should feel like one continuous story.

Add:

- fade transitions

- slide transitions

- scale transitions

- button hover effects

- button press effects

- subtle heart animations

Buttons must have:

- large touch-friendly size

- rounded pill shape

- pink/rose glow

- smooth hover/active states

On mobile:

- no horizontal scrolling

- no elements cut off

- buttons must fit screen

- typography must resize properly

- envelope must remain centered

- proposal buttons must remain accessible

- counter should stack nicely

ACCESSIBILITY:

- readable contrast

- buttons have accessible labels

- keyboard-friendly interactions

- do not rely only on hover for important interactions

CODE QUALITY:

- Keep components organized but don't over-engineer.

- Use reusable components where useful.

- Keep all romantic text in one easy-to-edit data structure.

- No backend.

- No database.

- No authentication.

- No unnecessary dependencies.

- No API calls.

- No external image requirements.

- Use CSS shapes/SVG/simple icons for the envelope and hearts where possible.

FINAL VISUAL GOAL:

The website should feel like:

"someone opened a secret romantic digital letter made especially for them."

It should look:

cute + romantic + elegant + premium + emotional + interactive.

It should NOT look:

like a generic template, dashboard, corporate website, or children's website.

MOST IMPORTANT:

Make the first version fully functional from beginning to end.

Do not leave placeholder buttons.

Do not leave TODO sections.

Do not create fake navigation.

Every button in the story must actually work.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://our-love-story-37.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/f998ac64-4ee6-4fc1-b12c-baa8537df82e).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
