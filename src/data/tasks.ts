import type { Level } from '../types';

/**
 * Complete curriculum for Athar Coding Platform
 * Codédex-style learning with stories, emojis, real-world examples
 * Progressive Python learning path with 6 levels including Cybersecurity
 */

export const levels: Level[] = [
  {
    id: 'level-1',
    order: 1,
    title: 'Python Foundations',
    titleAr: 'أساسيات بايثون',
    description: 'Begin your coding journey! Learn the fundamentals that every programmer needs.',
    descriptionAr: 'ابدأ رحلتك البرمجية! تعلم الأساسيات التي يحتاجها كل مبرمج.',
    icon: '🐍',
    xp: 100,
    tasks: [
      {
        id: 'task-1-1',
        levelId: 'level-1',
        title: 'Hello World',
        titleAr: 'مرحباً بالعالم',
        description: `🚀 **Your First Steps into Programming!**

Imagine you just landed on a new planet. The first thing you'd want to do is announce your arrival, right? 

In programming, we do exactly that! Every programmer's journey begins with a famous tradition called "Hello, World!" — it's like a rite of passage. 🎉

---

## 📖 The Story

Back in 1978, two brilliant programmers named Brian Kernighan and Dennis Ritchie wrote a book about a language called C. They used "Hello, World!" as the first example, and it became legendary!

---

## 🎯 Your Mission

Use the \`print()\` function to display your first message to the world:

\`\`\`python
print("Hello, World!")
\`\`\`

The \`print()\` function is like a megaphone 📢 — whatever you put inside the parentheses gets displayed on the screen!

**Pro tip:** Don't forget the quotes around your text!`,
        descriptionAr: 'اكتب أول برنامج بايثون لك! اطبع "Hello, World!" في وحدة التحكم.',
        difficulty: 'beginner',
        xp: 10,
        starterCode: '# 🎯 Your mission: Print "Hello, World!" to the console\n# Hint: Use the print() function\n\n',
        expectedOutput: 'Hello, World!',
        testCases: [
          {
            expectedOutput: 'Hello, World!',
            description: 'Should print Hello, World!',
            descriptionAr: 'يجب أن يطبع Hello, World!',
          },
        ],
        hints: ['Use the print() function', 'Put your text inside quotes " "'],
        hintsAr: ['استخدم دالة print()', 'ضع النص داخل علامات اقتباس " "'],
      },
      {
        id: 'task-1-2',
        levelId: 'level-1',
        title: 'Variables: Your Data Containers',
        titleAr: 'المتغيرات: حاويات البيانات',
        description: `📦 **Variables: Storing Your Treasures!**

Think of variables like labeled boxes where you can store your stuff. Instead of carrying everything in your hands, you put things in boxes and label them!

---

## 🏪 The Coffee Shop Analogy

Imagine you're a barista at a coffee shop ☕:
- You have a box labeled \`customer_name\` where you write the customer's name
- You have another box called \`order\` for their drink
- And \`price\` for how much it costs

\`\`\`python
customer_name = "Sarah"
order = "Latte"
price = 4.50
\`\`\`

---

## 🎓 The Rules

1. Variable names can't start with numbers ❌ \`1name\`
2. No spaces allowed! Use underscores instead ✅ \`my_name\`
3. They're case-sensitive: \`Name\` ≠ \`name\`

---

## 🎯 Your Mission

Create a variable called \`name\` with your name, then print it!`,
        descriptionAr: 'أنشئ متغيراً يسمى "name" باسمك واطبعه.',
        difficulty: 'beginner',
        xp: 15,
        starterCode: '# 📦 Create a variable called "name" with your name\n# Then print it using print()\n\n',
        testCases: [
          {
            expectedOutput: '',
            description: 'Should define a name variable and print it',
            descriptionAr: 'يجب تعريف متغير name وطباعته',
          },
        ],
        hints: ['Variables store data: name = "Your Name"', 'Use print(name) to display it'],
        hintsAr: ['المتغيرات تخزن البيانات: name = "اسمك"', 'استخدم print(name) للعرض'],
      },
      {
        id: 'task-1-3',
        levelId: 'level-1',
        title: 'String Magic',
        titleAr: 'سحر النصوص',
        description: `✨ **Combining Strings Like a Wizard!**

Strings are sequences of characters — basically, text! And just like magic spells, you can combine them together! 🧙‍♂️

---

## 🎭 The Theater Analogy

Imagine you're creating name tags for actors:
- First name: "Leonardo"
- Last name: "DiCaprio"
- Full name: "Leonardo DiCaprio"

You *concatenate* (fancy word for "join together") strings using \`+\`:

\`\`\`python
first = "Leonardo"
last = "DiCaprio"
full_name = first + " " + last
print(full_name)  # Leonardo DiCaprio
\`\`\`

---

## 💡 Pro Tips

You can also use f-strings (formatted strings) — they're like templates:

\`\`\`python
full_name = f"{first} {last}"
print(full_name)  # Leonardo DiCaprio
\`\`\`

---

## 🎯 Your Mission

Combine \`first\` and \`last\` variables to print a full name!`,
        descriptionAr: 'ادمج متغيرين بالاسم الأول والأخير، ثم اطبعهما معاً.',
        difficulty: 'beginner',
        xp: 20,
        starterCode: 'first = "John"\nlast = "Doe"\n\n# 🎯 Combine them and print the full name\n',
        testCases: [
          {
            expectedOutput: 'John Doe',
            description: 'Should print full name with space',
            descriptionAr: 'يجب طباعة الاسم الكامل مع مسافة',
          },
        ],
        hints: ['Use + to join strings', 'Add a space " " between names'],
        hintsAr: ['استخدم + لدمج النصوص', 'أضف مسافة " " بين الأسماء'],
      },
      {
        id: 'task-1-4',
        levelId: 'level-1',
        title: 'Math Time!',
        titleAr: 'وقت الرياضيات!',
        description: `🔢 **Python is a Super Calculator!**

Python can do all kinds of math! It's like having a super-powered calculator that never makes mistakes. 🧮

---

## 🛒 The Shopping Cart

Imagine you're shopping:
- Apples: $5
- Bread: $3
- Milk: $4

What's the total? Let Python calculate!

\`\`\`python
apples = 5
bread = 3
milk = 4
total = apples + bread + milk
print(total)  # 12
\`\`\`

---

## 🎓 Math Operations

| Operator | Meaning | Example |
|----------|---------|---------|
| \`+\` | Addition | \`5 + 3 = 8\` |
| \`-\` | Subtraction | \`10 - 4 = 6\` |
| \`*\` | Multiplication | \`3 * 4 = 12\` |
| \`/\` | Division | \`15 / 3 = 5.0\` |
| \`**\` | Power | \`2 ** 3 = 8\` |
| \`%\` | Remainder | \`7 % 3 = 1\` |

---

## 🎯 Your Mission

Calculate the sum of 15 and 27, then print it!`,
        descriptionAr: 'احسب مجموع 15 و27، ثم اطبع النتيجة.',
        difficulty: 'beginner',
        xp: 15,
        starterCode: '# 📊 Calculate the sum of 15 and 27\n# Print the result\n\n',
        expectedOutput: '42',
        testCases: [
          {
            expectedOutput: '42',
            description: 'Should print 42',
            descriptionAr: 'يجب أن يطبع 42',
          },
        ],
        hints: ['Use the + operator', 'print(15 + 27)'],
        hintsAr: ['استخدم عامل +', 'print(15 + 27)'],
      },
    ],
  },
  {
    id: 'level-2',
    order: 2,
    title: 'Control Flow',
    titleAr: 'تدفق التحكم',
    description: 'Make decisions in your code! Learn if statements and loops.',
    descriptionAr: 'اتخذ قرارات في كودك! تعلم عبارات if والحلقات.',
    icon: '🔀',
    xp: 200,
    tasks: [
      {
        id: 'task-2-1',
        levelId: 'level-2',
        title: 'If Statements: Making Decisions',
        titleAr: 'عبارة If: اتخاذ القرارات',
        description: `🤔 **Teaching Your Code to Think!**

Imagine you're a video game character. You reach a door:
- If you have the key → Open the door
- Otherwise → The door stays locked

This is exactly what \`if\` statements do! They help your code make decisions. 🎮

---

## 🌡️ The Weather App

\`\`\`python
temperature = 25

if temperature > 30:
    print("It's hot! 🔥")
elif temperature > 20:
    print("Nice weather! 😎")
else:
    print("It's cold! 🥶")
\`\`\`

---

## 🎓 The Comparison Toolkit

| Operator | Meaning |
|----------|---------|
| \`>\` | Greater than |
| \`<\` | Less than |
| \`>=\` | Greater or equal |
| \`<=\` | Less or equal |
| \`==\` | Equal to |
| \`!=\` | Not equal |

---

## 🎯 Your Mission

Check if a number is positive, and print "Positive" if it is!`,
        descriptionAr: 'اكتب عبارة if تتحقق إذا كان الرقم موجباً وتطبع "Positive"',
        difficulty: 'beginner',
        xp: 25,
        starterCode: 'number = 5\n\n# 🎯 If number is positive, print "Positive"\n',
        testCases: [
          {
            expectedOutput: 'Positive',
            description: 'Should print Positive for positive numbers',
            descriptionAr: 'يجب طباعة Positive للأرقام الموجبة',
          },
        ],
        hints: ['Use if number > 0:', 'Don\'t forget the colon and indentation!'],
        hintsAr: ['استخدم if number > 0:', 'لا تنس النقطتين والمسافة البادئة!'],
      },
      {
        id: 'task-2-2',
        levelId: 'level-2',
        title: 'Even or Odd?',
        titleAr: 'زوجي أم فردي؟',
        description: `🎲 **The Mystery of Even and Odd!**

Here's a fun fact: Every number in the universe is either even or odd. There's no in-between! 

**Even numbers** are divisible by 2: 2, 4, 6, 8, 10...
**Odd numbers** leave a remainder: 1, 3, 5, 7, 9...

---

## 🔧 The Secret Weapon: Modulo

The \`%\` operator (called modulo) gives you the remainder:

\`\`\`python
print(10 % 2)  # 0 (even!)
print(7 % 2)   # 1 (odd!)
\`\`\`

---

## 🎓 The Pattern

\`\`\`python
if number % 2 == 0:
    print("Even")
else:
    print("Odd")
\`\`\`

---

## 🎯 Your Mission

Check if 7 is even or odd, and print the result!`,
        descriptionAr: 'تحقق إذا كان الرقم زوجياً أم فردياً واطبع النتيجة.',
        difficulty: 'intermediate',
        xp: 30,
        starterCode: 'number = 7\n\n# 🎯 Check if even or odd\n',
        hints: ['if number % 2 == 0: means even', 'Use else for odd'],
        hintsAr: ['if number % 2 == 0: يعني زوجي', 'استخدم else للفردي'],
      },
      {
        id: 'task-2-3',
        levelId: 'level-2',
        title: 'For Loops: Repeat After Me!',
        titleAr: 'حلقة For: كرر ورائي!',
        description: `🔄 **The Power of Repetition!**

Imagine you're a DJ at a party 🎧 and you need to count down: "5... 4... 3... 2... 1... DROP THE BEAT!"

Would you write \`print()\` five times? No way! That's where loops come in!

---

## 🚀 The Magic of For Loops

\`\`\`python
for i in range(5):
    print(i)
# Output: 0, 1, 2, 3, 4
\`\`\`

---

## 🎓 Understanding range()

| Code | Output |
|------|--------|
| \`range(5)\` | 0, 1, 2, 3, 4 |
| \`range(1, 6)\` | 1, 2, 3, 4, 5 |
| \`range(0, 10, 2)\` | 0, 2, 4, 6, 8 |

---

## 🎯 Your Mission

Use a for loop to print numbers from 1 to 5!`,
        descriptionAr: 'استخدم حلقة for لطباعة الأرقام من 1 إلى 5.',
        difficulty: 'intermediate',
        xp: 35,
        starterCode: '# 🎯 Print numbers 1 to 5 using a for loop\n\n',
        expectedOutput: '1\n2\n3\n4\n5',
        testCases: [
          {
            expectedOutput: '1\n2\n3\n4\n5',
            description: 'Should print 1 through 5',
            descriptionAr: 'يجب طباعة 1 إلى 5',
          },
        ],
        hints: ['Use range(1, 6) to get 1-5', 'for i in range(1, 6): print(i)'],
        hintsAr: ['استخدم range(1, 6) للحصول على 1-5', 'for i in range(1, 6): print(i)'],
      },
      {
        id: 'task-2-4',
        levelId: 'level-2',
        title: 'While Loops: Until We\'re Done!',
        titleAr: 'حلقة While: حتى ننتهي!',
        description: `⏳ **Keep Going Until...**

While loops are like a determined friend who keeps asking "Are we there yet?" until you arrive! 🚗

---

## 🎮 The Game Logic

In video games, the main loop runs WHILE the player is alive:

\`\`\`python
lives = 3
while lives > 0:
    print(f"Lives remaining: {lives}")
    lives = lives - 1
print("Game Over!")
\`\`\`

---

## ⚠️ Warning: Infinite Loops!

If your condition never becomes False, your code runs forever! 😱

\`\`\`python
# 🚨 DANGER: This runs forever!
while True:
    print("Help!")
\`\`\`

---

## 🎯 Your Mission

Count down from 5 to 1 using a while loop!`,
        descriptionAr: 'استخدم حلقة while للعد التنازلي من 5 إلى 1.',
        difficulty: 'intermediate',
        xp: 40,
        starterCode: '# 🎯 Count down from 5 to 1\n\n',
        expectedOutput: '5\n4\n3\n2\n1',
        hints: ['Start with counter = 5', 'while counter > 0: print, then counter -= 1'],
        hintsAr: ['ابدأ بـ counter = 5', 'while counter > 0: اطبع، ثم counter -= 1'],
      },
    ],
  },
  {
    id: 'level-3',
    order: 3,
    title: 'Data Structures',
    titleAr: 'هياكل البيانات',
    description: 'Organize your data like a pro! Lists, dictionaries, and more.',
    descriptionAr: 'نظم بياناتك كالمحترفين! القوائم والقواميس والمزيد.',
    icon: '📦',
    xp: 300,
    tasks: [
      {
        id: 'task-3-1',
        levelId: 'level-3',
        title: 'Lists: Your Shopping Cart',
        titleAr: 'القوائم: سلة التسوق',
        description: `🛒 **Lists: Keep Things Organized!**

Think of a list as your shopping cart 🛒. You can add items, remove items, and see what's inside!

---

## 🍎 Creating a List

\`\`\`python
fruits = ["apple", "banana", "cherry"]
print(fruits[0])  # apple (first item)
print(fruits[1])  # banana (second item)
print(fruits[-1]) # cherry (last item!)
\`\`\`

---

## 🧮 Fun Fact: Indexing Starts at 0!

| Index | 0 | 1 | 2 |
|-------|---|---|---|
| Item | apple | banana | cherry |

---

## 🎯 Your Mission

Create a list with 3 fruits and print the second one!`,
        descriptionAr: 'أنشئ قائمة بـ 3 فواكه واطبع الثانية.',
        difficulty: 'beginner',
        xp: 30,
        starterCode: '# 🛒 Create a list of 3 fruits\n# Print the second fruit (index 1)\n\n',
        hints: ['fruits = ["apple", "banana", "cherry"]', 'print(fruits[1]) for second item'],
        hintsAr: ['fruits = ["apple", "banana", "cherry"]', 'print(fruits[1]) للعنصر الثاني'],
      },
      {
        id: 'task-3-2',
        levelId: 'level-3',
        title: 'List Superpowers',
        titleAr: 'قوى القوائم الخارقة',
        description: `💪 **List Methods: Your Toolbox!**

Lists come with built-in superpowers called methods!

---

## 🧰 The Toolbox

\`\`\`python
fruits = ["apple", "banana"]

# Add an item
fruits.append("orange")  # ["apple", "banana", "orange"]

# Remove an item
fruits.remove("banana")  # ["apple", "orange"]

# Get the length
print(len(fruits))  # 2
\`\`\`

---

## 📚 More Methods

| Method | What it does |
|--------|-------------|
| \`.append(x)\` | Add x to end |
| \`.remove(x)\` | Remove first x |
| \`.pop()\` | Remove & return last |
| \`.sort()\` | Sort the list |
| \`.reverse()\` | Reverse order |

---

## 🎯 Your Mission

Add "orange" to the fruits list using append()!`,
        descriptionAr: 'أضف "orange" إلى قائمة الفواكه باستخدام append().',
        difficulty: 'intermediate',
        xp: 35,
        starterCode: 'fruits = ["apple", "banana"]\n\n# 🎯 Add "orange" to the list\n# Print the list\n',
        hints: ['Use fruits.append("orange")', 'Then print(fruits) to see the result'],
        hintsAr: ['استخدم fruits.append("orange")', 'ثم print(fruits) لرؤية النتيجة'],
      },
      {
        id: 'task-3-3',
        levelId: 'level-3',
        title: 'Dictionaries: Your Contact Book',
        titleAr: 'القواميس: دفتر العناوين',
        description: `📖 **Dictionaries: Key-Value Magic!**

Think of a dictionary like your phone's contact book 📱:
- Name (key) → Number (value)
- "Mom" → "555-1234"
- "Pizza Place" → "555-9999"

---

## 🔑 Creating a Dictionary

\`\`\`python
contact = {
    "name": "John",
    "phone": "555-1234",
    "email": "john@email.com"
}

print(contact["name"])   # John
print(contact["phone"])  # 555-1234
\`\`\`

---

## ✨ Unlike Lists...

- Lists use indexes: \`list[0]\`
- Dictionaries use keys: \`dict["name"]\`

---

## 🎯 Your Mission

Create a dictionary with "name" and "age" keys!`,
        descriptionAr: 'أنشئ قاموساً بمفاتيح "name" و "age".',
        difficulty: 'intermediate',
        xp: 40,
        starterCode: '# 📖 Create a person dictionary with "name" and "age"\n# Print the name\n\n',
        hints: ['person = {"name": "Alex", "age": 25}', 'print(person["name"])'],
        hintsAr: ['person = {"name": "Alex", "age": 25}', 'print(person["name"])'],
      },
      {
        id: 'task-3-4',
        levelId: 'level-3',
        title: 'Loop Through Everything',
        titleAr: 'تكرار عبر كل شيء',
        description: `🔄 **Iterate Like a Pro!**

You can loop through any collection in Python — lists, dictionaries, strings, anything!

---

## 📝 Looping Through a Dictionary

\`\`\`python
person = {"name": "Alex", "age": 25}

# Loop through keys
for key in person:
    print(key)

# Loop through key-value pairs
for key, value in person.items():
    print(f"{key}: {value}")
\`\`\`

---

## 🎯 Your Mission

Loop through the dictionary and print all keys and values!`,
        descriptionAr: 'كرر عبر قاموس واطبع جميع المفاتيح والقيم.',
        difficulty: 'advanced',
        xp: 50,
        starterCode: 'person = {"name": "Ahmed", "age": 25, "city": "Riyadh"}\n\n# 🎯 Loop through and print each key: value\n',
        hints: ['for key, value in person.items():', 'print(f"{key}: {value}")'],
        hintsAr: ['for key, value in person.items():', 'print(f"{key}: {value}")'],
      },
    ],
  },
  {
    id: 'level-4',
    order: 4,
    title: 'Functions',
    titleAr: 'الدوال',
    description: 'Write reusable code! Functions are your secret weapon.',
    descriptionAr: 'اكتب كودًا قابلًا لإعادة الاستخدام! الدوال هي سلاحك السري.',
    icon: '⚡',
    xp: 400,
    tasks: [
      {
        id: 'task-4-1',
        levelId: 'level-4',
        title: 'Your First Function',
        titleAr: 'دالتك الأولى',
        description: `🎁 **Functions: Gift Wrap Your Code!**

Imagine you make amazing pancakes 🥞. Instead of explaining the recipe every time, you just say "I'll make my pancakes!" That's a function!

---

## 👨‍🍳 The Recipe Format

\`\`\`python
def greet():
    print("Hello there!")

# Call the function
greet()  # Output: Hello there!
\`\`\`

---

## 🎓 Breaking it Down

- \`def\` = "I'm defining a function"
- \`greet\` = the function name
- \`()\` = parentheses (we'll put ingredients here later)
- \`:\` = "here's what it does"
- Indented code = the function body

---

## 🎯 Your Mission

Create a function called "greet" that prints "Hello!"`,
        descriptionAr: 'أنشئ دالة تسمى "greet" تطبع "Hello!"',
        difficulty: 'beginner',
        xp: 35,
        starterCode: '# 🎯 Define a function called greet\n# It should print "Hello!"\n# Then call the function\n\n',
        hints: ['def greet(): starts the function', 'Call it with greet()'],
        hintsAr: ['def greet(): تبدأ الدالة', 'استدعها بـ greet()'],
      },
      {
        id: 'task-4-2',
        levelId: 'level-4',
        title: 'Parameters: Adding Ingredients',
        titleAr: 'المعاملات: إضافة المكونات',
        description: `🧪 **Parameters: Customize Your Functions!**

Remember our pancake analogy? Parameters are like asking: "Do you want chocolate chips? Blueberries?" 🫐

---

## 🎨 Adding Parameters

\`\`\`python
def greet(name):
    print(f"Hello, {name}!")

greet("Sarah")  # Hello, Sarah!
greet("John")   # Hello, John!
\`\`\`

---

## 🎓 Multiple Parameters

\`\`\`python
def introduce(name, age):
    print(f"I'm {name}, {age} years old")

introduce("Alex", 20)
\`\`\`

---

## 🎯 Your Mission

Create a function that takes a name and prints a greeting!`,
        descriptionAr: 'أنشئ دالة تأخذ اسماً وتطبع تحية.',
        difficulty: 'intermediate',
        xp: 40,
        starterCode: '# 🎯 Create a greet function with a name parameter\n# It should print "Hello, [name]!"\n\n',
        hints: ['def greet(name):', 'print(f"Hello, {name}!")'],
        hintsAr: ['def greet(name):', 'print(f"Hello, {name}!")'],
      },
      {
        id: 'task-4-3',
        levelId: 'level-4',
        title: 'Return Values: Getting Results',
        titleAr: 'قيم الإرجاع: الحصول على النتائج',
        description: `📤 **Return: Send Back Results!**

Imagine ordering food delivery 🍕. You give them your address, they give you pizza. The pizza is the "return value"!

---

## 🧮 Calculator Example

\`\`\`python
def add(a, b):
    return a + b

result = add(5, 3)
print(result)  # 8
\`\`\`

---

## 💡 Without Return

\`\`\`python
def add_no_return(a, b):
    print(a + b)  # Just prints, doesn't return

result = add_no_return(5, 3)  # Prints 8
print(result)  # None! 😱
\`\`\`

---

## 🎯 Your Mission

Create an add function that returns the sum of two numbers!`,
        descriptionAr: 'أنشئ دالة تجمع رقمين وترجع النتيجة.',
        difficulty: 'intermediate',
        xp: 45,
        starterCode: '# 🎯 Create an add function that RETURNS the sum\n# Then print the result of add(10, 5)\n\n',
        hints: ['def add(a, b): return a + b', 'result = add(10, 5); print(result)'],
        hintsAr: ['def add(a, b): return a + b', 'result = add(10, 5); print(result)'],
      },
      {
        id: 'task-4-4',
        levelId: 'level-4',
        title: 'Default Values: Set Defaults',
        titleAr: 'القيم الافتراضية',
        description: `🎛️ **Default Parameters: Pre-set Options!**

Like a coffee machine with default settings ☕:
- If you press just espresso → small size (default)
- If you specify → your choice

---

## ⚙️ Setting Defaults

\`\`\`python
def greet(name="Friend"):
    print(f"Hello, {name}!")

greet()        # Hello, Friend!
greet("Alex")  # Hello, Alex!
\`\`\`

---

## 🎓 Multiple Defaults

\`\`\`python
def order(drink="coffee", size="medium"):
    print(f"One {size} {drink}")

order()                    # One medium coffee
order("tea")              # One medium tea
order("latte", "large")   # One large latte
\`\`\`

---

## 🎯 Your Mission

Create a power function with a default exponent of 2!`,
        descriptionAr: 'أنشئ دالة قوة بأس افتراضي 2.',
        difficulty: 'advanced',
        xp: 50,
        starterCode: '# 🎯 Create a power function: power(base, exponent=2)\n# Return base ** exponent\n# Test: power(3) should return 9\n\n',
        hints: ['def power(base, exponent=2):', 'return base ** exponent'],
        hintsAr: ['def power(base, exponent=2):', 'return base ** exponent'],
      },
    ],
  },
  {
    id: 'level-5',
    order: 5,
    title: 'Advanced Concepts',
    titleAr: 'مفاهيم متقدمة',
    description: 'Level up with advanced techniques! Error handling and more.',
    descriptionAr: 'ارتقِ بمستواك مع تقنيات متقدمة! معالجة الأخطاء والمزيد.',
    icon: '🚀',
    xp: 500,
    tasks: [
      {
        id: 'task-5-1',
        levelId: 'level-5',
        title: 'Try-Except: Catch Errors',
        titleAr: 'Try-Except: التقاط الأخطاء',
        description: `🛡️ **Error Handling: Be Prepared!**

Errors are like unexpected potholes on the road 🕳️. Without handling them, your program crashes. With try-except, you gracefully navigate around!

---

## 💥 Common Errors

\`\`\`python
# ZeroDivisionError
10 / 0

# TypeError
"hello" + 5

# IndexError
my_list[999]
\`\`\`

---

## 🦸 The Hero: Try-Except

\`\`\`python
try:
    result = 10 / 0
except ZeroDivisionError:
    print("Oops! Can't divide by zero!")
\`\`\`

---

## 🎯 Your Mission

Handle a division by zero error gracefully!`,
        descriptionAr: 'تعامل مع خطأ القسمة على صفر بشكل سليم.',
        difficulty: 'intermediate',
        xp: 45,
        starterCode: 'try:\n    result = 10 / 0\nexcept:\n    # 🎯 Print a friendly error message\n    pass\n',
        hints: ['Replace pass with print()', 'print("Cannot divide by zero!")'],
        hintsAr: ['استبدل pass بـ print()', 'print("لا يمكن القسمة على صفر!")'],
      },
      {
        id: 'task-5-2',
        levelId: 'level-5',
        title: 'List Comprehension: One-Liners',
        titleAr: 'قائمة الفهم: سطر واحد',
        description: `✨ **List Comprehension: Python Magic!**

This is where Python shows off 💪. You can create lists in ONE line!

---

## 🔄 The Old Way

\`\`\`python
squares = []
for x in range(5):
    squares.append(x ** 2)
# [0, 1, 4, 9, 16]
\`\`\`

---

## ⚡ The Python Way

\`\`\`python
squares = [x ** 2 for x in range(5)]
# [0, 1, 4, 9, 16]
\`\`\`

---

## 🎓 The Formula

\`[expression for item in iterable]\`

More examples:
\`\`\`python
evens = [x for x in range(10) if x % 2 == 0]
# [0, 2, 4, 6, 8]
\`\`\`

---

## 🎯 Your Mission

Create a list of squares from 1 to 5 using list comprehension!`,
        descriptionAr: 'أنشئ قائمة بالأرقام المربعة من 1 إلى 5.',
        difficulty: 'advanced',
        xp: 55,
        starterCode: '# 🎯 Create [1, 4, 9, 16, 25] using list comprehension\n\n',
        hints: ['[x**2 for x in range(1, 6)]', 'Print the result'],
        hintsAr: ['[x**2 for x in range(1, 6)]', 'اطبع النتيجة'],
      },
      {
        id: 'task-5-3',
        levelId: 'level-5',
        title: 'Lambda: Anonymous Functions',
        titleAr: 'Lambda: الدوال المجهولة',
        description: `🥷 **Lambda: Quick & Anonymous!**

Lambda functions are like secret agents — they do the job and disappear! Perfect for simple, one-time operations.

---

## 🎭 Regular vs Lambda

\`\`\`python
# Regular function
def double(x):
    return x * 2

# Lambda function
double = lambda x: x * 2

# Both do the same thing!
print(double(5))  # 10
\`\`\`

---

## 🎓 Lambda Syntax

\`lambda parameters: expression\`

Examples:
\`\`\`python
add = lambda a, b: a + b
square = lambda x: x ** 2
\`\`\`

---

## 🎯 Your Mission

Create a lambda function that multiplies two numbers!`,
        descriptionAr: 'أنشئ دالة lambda تضرب رقمين.',
        difficulty: 'advanced',
        xp: 60,
        starterCode: '# 🎯 Create: multiply = lambda a, b: a * b\n# Then print multiply(4, 5)\n\n',
        hints: ['multiply = lambda a, b: a * b', 'print(multiply(4, 5))'],
        hintsAr: ['multiply = lambda a, b: a * b', 'print(multiply(4, 5))'],
      },
    ],
  },
  {
    id: 'level-6',
    order: 6,
    title: 'Python for Cybersecurity',
    titleAr: 'بايثون للأمن السيبراني',
    description: 'Use Python to protect systems! Learn real security techniques.',
    descriptionAr: 'استخدم بايثون لحماية الأنظمة! تعلم تقنيات أمنية حقيقية.',
    icon: '🔐',
    xp: 600,
    tasks: [
      {
        id: 'task-6-1',
        levelId: 'level-6',
        title: 'Password Strength Checker',
        titleAr: 'فاحص قوة كلمة المرور',
        description: `🔒 **Build a Password Fortress!**

> ⚠️ **IMPORTANT**: This course is for authorized security professionals and educational purposes only. Use these skills ethically to protect systems.

---

## 🛡️ Why Password Strength Matters

Weak passwords like "123456" or "password" are cracked in seconds! As a security professional, you need to help users create strong passwords.

---

## 📏 Strong Password Rules

1. At least 8 characters
2. Contains uppercase letters
3. Contains lowercase letters  
4. Contains numbers
5. Contains special characters

---

## 🔧 Python Tools

\`\`\`python
password = "MyP@ss123"

# Check length
len(password) >= 8  # True

# Check for uppercase
any(c.isupper() for c in password)  # True

# Check for digits
any(c.isdigit() for c in password)  # True
\`\`\`

---

## 🎯 Your Mission

Check if a password has at least 8 characters!`,
        descriptionAr: 'تحقق إذا كانت كلمة المرور تحتوي على 8 أحرف على الأقل.',
        difficulty: 'beginner',
        xp: 50,
        starterCode: 'password = "SecurePass123!"\n\n# 🎯 Check if password is at least 8 characters\n# Print "Strong" if yes, "Weak" if no\n\n',
        hints: ['if len(password) >= 8:', 'Use if-else to print the result'],
        hintsAr: ['if len(password) >= 8:', 'استخدم if-else لطباعة النتيجة'],
      },
      {
        id: 'task-6-2',
        levelId: 'level-6',
        title: 'Caesar Cipher: Classic Encryption',
        titleAr: 'شفرة قيصر: التشفير الكلاسيكي',
        description: `🔐 **The Caesar Cipher: Ancient Secrets!**

Julius Caesar used this cipher to send secret military messages 2000 years ago! Each letter is shifted by a certain number.

---

## 📜 How It Works

With a shift of 3:
- A → D
- B → E
- HELLO → KHOOR

---

## 🔧 The Algorithm

\`\`\`python
def caesar_encrypt(text, shift):
    result = ""
    for char in text:
        if char.isalpha():
            # Get the base (A or a)
            base = ord('A') if char.isupper() else ord('a')
            # Shift and wrap around
            shifted = (ord(char) - base + shift) % 26 + base
            result += chr(shifted)
        else:
            result += char
    return result
\`\`\`

---

## 🎯 Your Mission

Encrypt "HELLO" with a shift of 3!`,
        descriptionAr: 'شفّر "HELLO" بإزاحة 3.',
        difficulty: 'intermediate',
        xp: 60,
        starterCode: 'def caesar_encrypt(text, shift):\n    result = ""\n    for char in text:\n        if char.isalpha():\n            base = ord(\'A\') if char.isupper() else ord(\'a\')\n            shifted = (ord(char) - base + shift) % 26 + base\n            result += chr(shifted)\n        else:\n            result += char\n    return result\n\n# 🎯 Encrypt "HELLO" with shift 3\n',
        expectedOutput: 'KHOOR',
        hints: ['print(caesar_encrypt("HELLO", 3))', 'The result should be KHOOR'],
        hintsAr: ['print(caesar_encrypt("HELLO", 3))', 'النتيجة يجب أن تكون KHOOR'],
      },
      {
        id: 'task-6-3',
        levelId: 'level-6',
        title: 'Hash Functions: Digital Fingerprints',
        titleAr: 'دوال التجزئة: البصمات الرقمية',
        description: `🔏 **Hashing: One-Way Streets!**

Hash functions create a unique "fingerprint" for any data. They're used to:
- Store passwords safely
- Verify file integrity
- Create digital signatures

---

## 🎯 Key Properties

1. **Deterministic**: Same input → Same hash
2. **One-way**: Can't reverse the hash
3. **Unique**: Different inputs → Different hashes
4. **Fixed size**: Any input → Same hash length

---

## 🔧 Python's hashlib

\`\`\`python
import hashlib

# Create MD5 hash
text = "hello"
hash_obj = hashlib.md5(text.encode())
print(hash_obj.hexdigest())
# 5d41402abc4b2a76b9719d911017c592

# SHA-256 (more secure)
hash_obj = hashlib.sha256(text.encode())
print(hash_obj.hexdigest())
\`\`\`

---

## 🎯 Your Mission

Create a SHA-256 hash of "password123"!`,
        descriptionAr: 'أنشئ تجزئة SHA-256 لـ "password123".',
        difficulty: 'intermediate',
        xp: 65,
        starterCode: 'import hashlib\n\ntext = "password123"\n\n# 🎯 Create SHA-256 hash and print it\n',
        hints: ['hash_obj = hashlib.sha256(text.encode())', 'print(hash_obj.hexdigest())'],
        hintsAr: ['hash_obj = hashlib.sha256(text.encode())', 'print(hash_obj.hexdigest())'],
      },
      {
        id: 'task-6-4',
        levelId: 'level-6',
        title: 'Port Scanner Basics',
        titleAr: 'أساسيات فحص المنافذ',
        description: `🔍 **Port Scanning: Network Reconnaissance!**

> ⚠️ **LEGAL WARNING**: Only scan systems you own or have explicit permission to test!

Ports are like doors in a building. Knowing which doors are open helps identify running services.

---

## 🚪 Common Ports

| Port | Service |
|------|---------|
| 21 | FTP |
| 22 | SSH |
| 80 | HTTP |
| 443 | HTTPS |
| 3306 | MySQL |

---

## 🔧 Simple Port Check

\`\`\`python
import socket

def check_port(host, port):
    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    sock.settimeout(1)
    result = sock.connect_ex((host, port))
    sock.close()
    return result == 0  # True if open

# Check if port 80 is open
is_open = check_port("localhost", 80)
print(f"Port 80: {'Open' if is_open else 'Closed'}")
\`\`\`

---

## 🎯 Your Mission

Check if port 80 on localhost is open or closed!`,
        descriptionAr: 'تحقق إذا كان المنفذ 80 على localhost مفتوحاً أم مغلقاً.',
        difficulty: 'advanced',
        xp: 70,
        starterCode: 'import socket\n\ndef check_port(host, port):\n    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)\n    sock.settimeout(1)\n    result = sock.connect_ex((host, port))\n    sock.close()\n    return result == 0\n\n# 🎯 Check port 80 on "localhost"\n# Print "Open" or "Closed"\n\n',
        hints: ['is_open = check_port("localhost", 80)', 'print("Open" if is_open else "Closed")'],
        hintsAr: ['is_open = check_port("localhost", 80)', 'print("Open" if is_open else "Closed")'],
      },
    ],
  },
];

/**
 * Get level by ID
 */
export function getLevelById(levelId: string): Level | undefined {
  return levels.find(level => level.id === levelId);
}

/**
 * Get task by ID
 */
export function getTaskById(taskId: string): any {
  for (const level of levels) {
    const task = level.tasks.find(t => t.id === taskId);
    if (task) return task;
  }
  return undefined;
}

/**
 * Get first incomplete task
 */
export function getFirstIncompleteTask(completedTasks: string[]): { levelId: string; taskId: string } | null {
  for (const level of levels) {
    for (const task of level.tasks) {
      if (!completedTasks.includes(task.id)) {
        return { levelId: level.id, taskId: task.id };
      }
    }
  }
  return null;
}
