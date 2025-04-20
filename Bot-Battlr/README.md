🤖 Bot Battler Army
This is a React app for managing a collection of bots. You can sort, filter, delete, and build your own Bot Army — but with a twist! You can only add one bot per class to your army at a time.

✨ Features
View All Bots: A list of all available bots is displayed on load.

Sort Bots: You can sort bots by:

Health

Damage

Armor

In ascending or descending order

You can also restore the original arrangement

Filter Bots: Filter bots by their class, like Medic, Support, etc. Click again to restore the full list.

Add to Army: Add bots to your personal army.

Only one bot per class can be added at a time.

If a bot of a class already exists in your army, a message is shown.

Remove from Army: Bots can be removed and returned to the main collection.

Permanent Delete: Bots can be permanently deleted from the server.

Bot Details: Click on any bot to view extra details, such as:

Catchphrase

Creation and update time

🧠 How It Works
Main State:

bots: The current visible bot collection

originalBots: The full original list (used for restoring)

army: The bots currently in your army

Sorting:

When you click sort, the bots list is sorted

You also see a message telling you what kind of sort was applied

Clicking the sort button again restores the original list

Filtering:

Clicking a class filters the list to only bots of that class

Clicking again restores the full list

Messages:

Temporary messages appear for:

Sorting

Filtering

Army class conflict

Permanent deletion

🛠️ How to Run
Make sure you have the bot server running on http://localhost:3000/bots.

Then:

bash
Copy
Edit
npm install
npm start
The app should open at http://localhost:3000 (or another port if 3000 is in use).

📁 File Structure
App.js: Main application logic and state

BotCollection.js: Displays available bots

YourBotArmy.js: Displays bots in your army

Sort.js: Handles sorting UI and logic

Filter.js: Handles filtering UI and logic

Header.js: Header component

App.css: Styles

 Extra Notes
Bots are fetched from a JSON server (http://localhost:3000/bots).

Bots removed from the army are added back to the collection in their original order.

Deleted bots are removed from both the army and the collection forever.

You can view detailed information on any bot by clicking on it.

 To Do / Ideas
Add drag and drop to manage the army

Add bot abilities or levels

Add local storage to save progress


