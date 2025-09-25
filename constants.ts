import { DailyChallenge, ChecklistItemData, Page, Notification, Badge, Article, StrategyChallenge, NaturalisticStrategyType } from './types';

export const NAV_ITEMS = [
  { id: Page.Dashboard, icon: 'fas fa-home', label: 'Home' },
  { id: Page.Strategies, icon: 'fas fa-lightbulb', label: 'Strategies' },
  { id: Page.HoneyStore, icon: 'fas fa-store', label: 'Store' },
  { id: Page.Progress, icon: 'fas fa-chart-line', label: 'Progress' },
];

export const EDUCATION_LEVELS = [
  'Prefer not to say',
  'High School / NCEA Level 1-3',
  'Certificate / Diploma (Level 4-6)',
  'Bachelor\'s Degree / Graduate Diploma (Level 7)',
  'Postgraduate Degree (Level 8-10)',
  'Ph.D',
  'Other',
];

export const HOME_LANGUAGES = [
  'English',
  'Te Reo Māori',
  'NZ Sign Language',
  'Samoan',
  'Mandarin (Northern Chinese)',
  'Cantonese (Yue)',
  'Hindi',
  'French',
  'Tagalog',
  'German',
  'Other',
];

export const NOTIFICATIONS: Notification[] = [
  { id: 1, text: 'Welcome to Speechive! We\'re glad you\'re here.', timestamp: 'Just now', read: false, icon: 'fas fa-hand-sparkles', iconBgColor: 'bg-indigo-500' },
  { id: 2, text: 'Tap on "Strategies" from the home screen to begin your first 30-day challenge.', timestamp: 'Just now', read: false, icon: 'fas fa-lightbulb', iconBgColor: 'bg-amber-500' },
  { id: 3, text: 'Complete activities to earn Honey Drops and unlock badges!', timestamp: 'Just now', read: false, icon: 'fas fa-coins', iconBgColor: 'bg-green-500' },
];

export const NATURALISTIC_STRATEGIES: StrategyChallenge[] = [
  {
    type: NaturalisticStrategyType.Expansion,
    title: 'Expansion',
    description: 'Add to your child\'s words to make sentences more complete.',
    icon: 'fas fa-expand-arrows-alt',
    color: 'bg-sky-500',
    challenge: [
      {
        day: 1,
        activities: [
          {
            id: 'exp-d1-a1',
            title: 'Reading Book Together',
            image: 'https://picsum.photos/seed/book/400/400',
            description: "Use story time to expand on your child's words. When they name something in the book, add more details to turn their single word into a rich, descriptive sentence.",
            completed: false,
            duration: 0,
            recommendedTime: 10,
            skills: ['Vocabulary', 'Sentences', 'Listening'],
            script: [
              {
                title: 'Doggy Story',
                dialogue: [
                  { speaker: 'Child', line: 'Doggy.' },
                  { speaker: 'Parent', line: 'Yes, that is a big doggy. He has soft brown fur. Do you see his long tail?' },
                  { speaker: 'Child', line: 'Tail.' },
                  { speaker: 'Parent', line: 'That’s right, his tail is wagging. He looks very happy. What do you think he wants to do?' },
                  { speaker: 'Child', line: 'Run.' },
                  { speaker: 'Parent', line: 'Yes, the doggy wants to run in the park. Let’s watch—oh look, he is chasing the red ball. The ball is bouncing so high!' },
                ],
              },
              {
                title: 'Cat Adventure',
                dialogue: [
                  { speaker: 'Child', line: 'Cat jump.' },
                  { speaker: 'Parent', line: 'The cat is jumping high onto the chair. Wow, she is very quick! Can you jump like the cat?' },
                  { speaker: 'Child', line: 'jumps a little "Jump!"' },
                  { speaker: 'Parent', line: 'Great jumping! Now the cat is sitting on the soft chair. Her tail is moving back and forth.' },
                ],
              },
            ],
          },
          {
            id: 'exp-d1-a2',
            title: 'Playing with Blocks',
            image: 'https://picsum.photos/seed/blocks/400/400',
            description: "Building with blocks is a great way to introduce concepts like size, color, and position. Expand on every word they say to build their vocabulary.",
            completed: false,
            duration: 0,
            recommendedTime: 15,
            skills: ['Colors', 'Sizes', 'Prepositions'],
            script: [
              {
                title: 'Tall Tower',
                dialogue: [
                  { speaker: 'Child', line: 'Block.' },
                  { speaker: 'Parent', line: "Yes, that's a big red block! It feels very smooth." },
                  { speaker: 'Child', line: 'Up.' },
                  { speaker: 'Parent', line: "You want to put the block up on top. Let's build a tall tower." },
                ],
              },
            ],
          },
          {
            id: 'exp-d1-a3',
            title: 'Meal Time',
            image: 'https://picsum.photos/seed/meal/400/400',
            description: "Meal and snack times are perfect for natural conversation. Talk about the food's taste, texture, and temperature, expanding on your child's requests and comments.",
            completed: false,
            duration: 0,
            recommendedTime: 5,
            skills: ['Describing', 'Requesting', 'Vocabulary'],
            script: [
              {
                title: 'Yummy Snack',
                dialogue: [
                  { speaker: 'Child', line: 'More.' },
                  { speaker: 'Parent', line: 'You want more yummy apple slices? They are so crunchy and sweet.' },
                  { speaker: 'Child', line: 'Juice.' },
                  { speaker: 'Parent', line: "You're pointing to your juice. It's cold apple juice in your favorite blue cup." },
                ],
              },
            ],
          },
        ],
      },
      {
        day: 2,
        activities: [
          {
            id: 'exp-d2-a1',
            title: 'Outdoor Fun',
            image: 'https://picsum.photos/seed/park/400/400',
            description: "At the park, expand on your child's observations about nature and the playground.",
            completed: false,
            duration: 0,
            recommendedTime: 15,
            skills: ['Nature', 'Actions', 'Describing'],
            script: [
              {
                title: 'Playground Adventure',
                dialogue: [
                    { speaker: 'Child', line: 'Slide.' },
                    { speaker: 'Parent', line: 'Yes, that is a long, yellow slide. You want to go down the slide?' },
                    { speaker: 'Child', line: 'Go fast!' },
                    { speaker: 'Parent', line: 'You went down so fast! Whee! That looked like a lot of fun. Now you are at the bottom.' },
                ],
              },
            ],
          },
          {
            id: 'exp-d2-a2',
            title: 'Grocery Shopping',
            image: 'https://picsum.photos/seed/grocery/400/400',
            description: "Talk about the items you see and put in the cart, expanding on colors, shapes, and food names.",
            completed: false,
            duration: 0,
            recommendedTime: 10,
            skills: ['Food', 'Colors', 'Categories'],
            script: [
              {
                title: 'Market Finds',
                dialogue: [
                    { speaker: 'Child', line: 'Banana.' },
                    { speaker: 'Parent', line: 'You see the yellow bananas. We need three bananas for our snacks this week.' },
                    { speaker: 'Child', line: 'Cart in.' },
                    { speaker: 'Parent', line: 'That\'s right, let\'s put the bananas in the cart. Good helping!' },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    type: NaturalisticStrategyType.Recast,
    title: 'Recast',
    description: 'Correct grammatical errors in a positive, conversational way.',
    icon: 'fas fa-retweet',
    color: 'bg-rose-500',
    challenge: [
        {
            day: 1,
            activities: [
                {
                    id: 'rec-d1-a1',
                    title: 'Story Time Corrections',
                    image: 'https://picsum.photos/seed/storytime/400/400',
                    description: "When your child describes a picture incorrectly, gently recast their sentence with the correct grammar.",
                    completed: false, duration: 0, recommendedTime: 10, skills: ['Grammar', 'Verbs', 'Sentences'],
                    script: [
                        {
                            title: 'Recasting Verbs',
                            dialogue: [
                                { speaker: 'Child', line: 'The dog runned.' },
                                { speaker: 'Parent', line: 'Yes, the dog ran so fast! Look at him go.' },
                            ],
                        },
                    ],
                },
                {
                    id: 'rec-d1-a2',
                    title: 'Play-Doh Fun',
                    image: 'https://picsum.photos/seed/playdoh/400/400',
                    description: "Recast possessives and plurals while creating things with Play-Doh.",
                    completed: false, duration: 0, recommendedTime: 15, skills: ['Plurals', 'Possessives'],
                    script: [
                        {
                            title: 'Making Shapes',
                            dialogue: [
                                { speaker: 'Child', line: 'I see two cat.' },
                                { speaker: 'Parent', line: 'You see two cats! One is blue and one is red.' },
                            ],
                        },
                    ],
                },
                {
                    id: 'rec-d1-a3',
                    title: 'Tea Party Pronouns',
                    image: 'https://picsum.photos/seed/teaparty/400/400',
                    description: "During a pretend tea party, recast incorrect pronoun usage in a natural way.",
                    completed: false, duration: 0, recommendedTime: 10, skills: ['Pronouns', 'Conversation'],
                    script: [
                        {
                            title: 'Correcting Pronouns',
                            dialogue: [
                                { speaker: 'Child', line: 'Her wants more tea.' },
                                { speaker: 'Parent', line: 'Yes, she wants more tea. Should we give her the pink cup?' },
                            ],
                        },
                    ],
                }
            ],
        },
        {
            day: 2,
            activities: [
                {
                    id: 'rec-d2-a1',
                    title: 'Chatting About the Day',
                    image: 'https://picsum.photos/seed/chatting/400/400',
                    description: "During bedtime chats, recast past-tense verbs from the day's events.",
                    completed: false, duration: 0, recommendedTime: 5, skills: ['Past Tense', 'Conversation'],
                     script: [
                        {
                            title: 'Recalling the Day',
                            dialogue: [
                                { speaker: 'Child', line: 'We goed to the park.' },
                                { speaker: 'Parent', line: 'We did! We went to the park and it was so sunny.' },
                            ],
                        },
                    ],
                },
            ],
        },
    ],
  },
  {
    type: NaturalisticStrategyType.OpenEQ,
    title: 'Open EQ',
    description: 'Ask open-ended questions to encourage longer responses.',
    icon: 'fas fa-question-circle',
    color: 'bg-indigo-500',
    challenge: [
      {
            day: 1,
            activities: [
                {
                    id: 'oeq-d1-a1',
                    title: 'Stretch the Story',
                    image: 'https://picsum.photos/seed/stretchstory/400/400',
                    description: "Use open-ended questions to turn a simple observation into a rich, imaginative conversation, helping your child think creatively and use more descriptive language.",
                    completed: false,
                    duration: 0,
                    recommendedTime: 15,
                    skills: ['Imagination', 'Describing', 'Conversation'],
                    script: [
                        {
                            title: 'Park Adventure',
                            dialogue: [
                                { speaker: 'Child', line: 'Bird flying.' },
                                { speaker: 'Parent', line: 'Yes, the bird is flying high over the trees. Where do you think it’s going?' },
                                { speaker: 'Child', line: 'To the tree.' },
                                { speaker: 'Parent', line: 'Maybe it’s going to the tree to find a safe branch. What do you think the bird might see from way up high?' },
                                { speaker: 'Child', line: 'People.' },
                                { speaker: 'Parent', line: 'Yes, people walking in the park. Maybe it can see us too! What else can it see from the sky?' },
                                { speaker: 'Child', line: 'Flowers.' },
                                { speaker: 'Parent', line: 'Beautiful flowers! What colours do you see on the flowers over there?' },
                                { speaker: 'Child', line: 'Red and yellow.' },
                                { speaker: 'Parent', line: 'Red and yellow—those are bright colours. Which one is your favourite?' },
                                { speaker: 'Child', line: 'Yellow.' },
                                { speaker: 'Parent', line: 'Yellow is so cheerful. Can you find something else in the park that’s yellow?' },
                                { speaker: 'Child', line: 'Slide!' },
                                { speaker: 'Parent', line: 'Good spotting! The slide is shiny yellow. Do you think it feels hot or cool in the sunshine?' },
                                { speaker: 'Child', line: 'Hot.' },
                                { speaker: 'Parent', line: 'Yes, the sun warms it up. What do you like to do first on the slide—climb up or slide down fast?' },
                                { speaker: 'Child', line: 'Slide down fast!' },
                                { speaker: 'Parent', line: 'That sounds fun. Let’s imagine we’re sliding down together. Wheee! How does it feel when the wind touches your face?' },
                                { speaker: 'Child', line: 'Tickly!' },
                                { speaker: 'Parent', line: 'Tickly! I like that word. Can you think of something else in the park that might feel tickly?' },
                                { speaker: 'Child', line: 'Grass!' },
                                { speaker: 'Parent', line: 'Yes, the grass tickles our feet when we sit on it. Should we go touch the grass and feel it?' },
                                { speaker: 'Parent', line: 'It feels soft and cool. What do you think lives inside the grass?' },
                                { speaker: 'Child', line: 'Bugs!' },
                                { speaker: 'Parent', line: 'Maybe tiny bugs. What kind of bug do you hope to see today?' },
                                { speaker: 'Child', line: 'Ladybug.' },
                                { speaker: 'Parent', line: 'A ladybug would be lovely. Let’s keep looking while we play.' },
                            ],
                        },
                    ],
                },
                {
                    id: 'oeq-d1-a2',
                    title: 'Picture Book Exploration',
                    image: 'https://picsum.photos/seed/picturebook/400/400',
                    description: "Instead of asking 'What's that?', ask questions that require more thought.",
                    completed: false, duration: 0, recommendedTime: 10, skills: ['Inferencing', 'Storytelling'],
                     script: [
                        {
                            title: 'Thinking Questions',
                            dialogue: [
                                { speaker: 'Parent', line: 'What do you think will happen next?' },
                                { speaker: 'Child', line: 'He will find his mommy.' },
                            ],
                        },
                    ],
                },
                {
                    id: 'oeq-d1-a3',
                    title: 'Building a Fort',
                    image: 'https://picsum.photos/seed/fort/400/400',
                    description: "Ask 'how' and 'why' questions during a building activity.",
                    completed: false, duration: 0, recommendedTime: 15, skills: ['Problem Solving', 'Planning'],
                    script: [
                        {
                            title: 'Fort Construction',
                            dialogue: [
                                { speaker: 'Parent', line: 'How can we make the roof stay up?' },
                                { speaker: 'Child', line: 'Use that big pillow!' },
                            ],
                        },
                    ],
                },
            ],
        },
        {
            day: 2,
            activities: [
                {
                    id: 'oeq-d2-a1',
                    title: 'Drawing Together',
                    image: 'https://picsum.photos/seed/drawing/400/400',
                    description: "Ask questions about their creation to encourage descriptive language.",
                    completed: false, duration: 0, recommendedTime: 10, skills: ['Imagination', 'Describing'],
                     script: [
                        {
                            title: 'Creative Minds',
                            dialogue: [
                                { speaker: 'Parent', line: 'Tell me about what you are drawing.' },
                                { speaker: 'Child', line: 'It\'s a big rocket ship going to the moon!' },
                            ],
                        },
                    ],
                },
            ],
        },
    ],
  },
  {
    type: NaturalisticStrategyType.Comment,
    title: 'Comment',
    description: 'Narrate and comment on what you and your child are doing.',
    icon: 'fas fa-comment-dots',
    color: 'bg-green-500',
    challenge: [
        {
            day: 1,
            activities: [
                {
                    id: 'com-d1-a1',
                    title: 'Making a Snack (Self-Talk)',
                    image: 'https://picsum.photos/seed/snackmaking/400/400',
                    description: "Talk about what you are doing as you prepare a snack for your child.",
                    completed: false, duration: 0, recommendedTime: 5, skills: ['Sequencing', 'Vocabulary', 'Verbs'],
                    script: [
                        {
                            title: 'Parent Narration',
                            dialogue: [
                                { speaker: 'Parent', line: 'I am cutting the banana. Now I am putting it on the plate for you. Yum!' },
                            ],
                        },
                    ],
                },
                {
                    id: 'com-d1-a2',
                    title: 'Washing Toys (Parallel Talk)',
                    image: 'https://picsum.photos/seed/washingtoys/400/400',
                    description: "Comment on what your child is doing as they play.",
                    completed: false, duration: 0, recommendedTime: 10, skills: ['Actions', 'Attention'],
                    script: [
                        {
                            title: 'Child-Led Play Narration',
                            dialogue: [
                                { speaker: 'Parent', line: 'You are washing the blue car. You\'re making it so clean and bubbly. Splash, splash!' },
                            ],
                        },
                    ],
                },
            ],
        },
        {
            day: 2,
            activities: [
                {
                    id: 'com-d2-a1',
                    title: 'Looking Out the Window',
                    image: 'https://picsum.photos/seed/window/400/400',
                    description: "Comment on the things you see outside together.",
                    completed: false, duration: 0, recommendedTime: 5, skills: ['Observation', 'Describing'],
                    script: [
                        {
                            title: 'Neighborhood Watch',
                            dialogue: [
                                { speaker: 'Parent', line: 'I see a big red truck driving by. It\'s making a loud noise. Vroom!' },
                            ],
                        },
                    ],
                },
            ],
        },
    ],
  },
];

export const THIRTY_DAY_CHALLENGE: DailyChallenge[] = Array.from({ length: 30 }, (_, i) => {
    const day = i + 1;
    const allStrategies = [
        // Communication Basics
        { id: `d${day}s1`, title: 'Sound Scavenger Hunt', description: 'Go on a walk and identify all the sounds you hear.', icon: 'fas fa-search', color: 'bg-amber-400', details: ['Start by asking "What can you hear right now?"', 'Listen for birds, cars, wind, or people talking.', 'When you hear a sound, name it: "I hear a dog barking!"', 'Encourage your child to point in the direction of the sound.'] },
        { id: `d${day}s2`, title: 'Narrate Your Day', description: 'Talk about what you are doing, moment by moment.', icon: 'fas fa-comment-dots', color: 'bg-sky-400', details: ['As you make breakfast, say what you\'re doing: "I am pouring the milk."', 'When getting dressed, name the clothes: "Let\'s put on your blue shirt."', 'This technique, called self-talk, helps connect words to actions and objects.'] },
        { id: `d${day}s3`, title: 'Sing-Along Time', description: 'Sing simple, repetitive songs like "Old MacDonald".', icon: 'fas fa-music', color: 'bg-rose-400', details: ['Choose songs with lots of repetition and actions.', 'Emphasize vowel sounds and simple consonant sounds.', '"Old MacDonald" is great for practicing animal sounds.'] },
        { id: `d${day}s4`, title: 'Reading Point-and-Say', description: 'Point to pictures in a book and name them clearly.', icon: 'fas fa-book-open', color: 'bg-green-400', details: ['Choose a colorful picture book.', 'Point to an object and say its name clearly: "Look, a big, red ball!"', 'Encourage your child to point to the picture after you name it.'] },
        
        // Interactive Play
        { id: `d${day}s5`, title: 'Mirror Me', description: 'Make silly faces and sounds in front of a mirror.', icon: 'fas fa-smile', color: 'bg-teal-400', details: ['Sit with your child in front of a mirror.', 'Make different facial expressions (happy, sad, surprised).', 'Make simple sounds like "ooo", "eee", "buh", and encourage your child to copy you.'] },
        { id: `d${day}s6`, title: 'Toy Talk', description: 'Pick a favorite toy and describe it together.', icon: 'fas fa-rocket', color: 'bg-indigo-400', details: ['Hold the toy and talk about it: "This is a car. It\'s blue. It has four wheels."', 'Use describing words (adjectives) like big, small, soft, hard.', 'Ask simple questions: "Where is the car\'s door?"'] },
        { id: `d${day}s7`, title: 'Kitchen Helper', description: 'Name ingredients and actions while you cook or bake.', icon: 'fas fa-utensils', color: 'bg-orange-400', details: ['Give your child simple tasks like stirring or pouring (with help).', 'Name the ingredients: "This is flour. This is an egg."', 'Use action words: "Let\'s stir the batter. Now we will pour it."'] },
        { id: `d${day}s8`, title: 'I Spy with Sounds', description: 'Play "I Spy" using animal or object sounds.', icon: 'fas fa-volume-up', color: 'bg-purple-400', details: ['Start by saying, "I spy with my little ear, something that says \'moo\'!"', 'Have your child guess the animal (a cow).', 'Take turns making sounds for each other to guess.'] },

        // Building Concepts
        { id: `d${day}s9`, title: 'Feeling Faces', description: 'Look at photos of faces and talk about the emotions.', icon: 'fas fa-sad-tear', color: 'bg-yellow-500', details: ['Use a family photo album or pictures from a magazine.', 'Point to a face and say, "She looks happy! See her big smile?"', 'Imitate the facial expressions together.'] },
        { id: `d${day}s10`, title: 'Bubble Pop Countdown', description: 'Blow bubbles and count them as your child pops them.', icon: 'fas fa-sort-numeric-up-alt', color: 'bg-pink-400', details: ['Blow a few bubbles.', 'As your child pops them, count aloud together: "One... two... three pops!"', 'This is a fun way to practice counting and one-to-one correspondence.'] },
        { id: `d${day}s11`, title: 'Obstacle Course Fun', description: 'Use simple directions to navigate a homemade course.', icon: 'fas fa-running', color: 'bg-lime-500', details: ['Create a simple obstacle course with pillows, chairs, and blankets.', 'Give one-step directions: "Go under the table," or "Jump over the pillow."', 'As they master one-step directions, try two-step directions: "First crawl through the blanket tunnel, then get the teddy bear."'] },
        { id: `d${day}s12`, title: '"What\'s in the Box?" Game', description: 'Place a familiar object in a box for them to guess.', icon: 'fas fa-box', color: 'bg-cyan-500', details: ['Find a shoebox with a lid.', 'Secretly place a familiar object inside (like a spoon, a toy car, or a block).', 'Give clues about the object: "It\'s something we use to eat soup."'] },

        // Language & Literacy
        { id: `d${day}s13`, title: 'Rhyme Time', description: 'Say a word like "cat" and find something that rhymes.', icon: 'fas fa-hat-wizard', color: 'bg-fuchsia-500', details: ['Start with a simple word like "bee."', 'Ask, "What sounds like bee? Does tree sound like bee?"', 'Use rhyming books to help introduce the concept.'] },
        { id: `d${day}s14`, title: 'Action Songs', description: 'Sing "Head, Shoulders, Knees, and Toes" to learn body parts.', icon: 'fas fa-child', color: 'bg-amber-600', details: ['Sing the song slowly at first, touching each body part as you name it.', 'Speed up for more fun as your child gets familiar with the words.', 'Other great action songs include "The Wheels on the Bus" and "If You\'re Happy and You Know It."'] },
        { id: `d${day}s15`, title: 'Play-Doh Creations', description: 'Talk about the colors and shapes you are making.', icon: 'fas fa-paint-brush', color: 'bg-sky-600', details: ['As you play, narrate your actions: "I\'m rolling a long, green snake."', 'Talk about the textures: "This Play-Doh feels soft and squishy."', 'Practice requesting: "Can I have the blue Play-Doh, please?"'] },
        { id: `d${day}s16`, title: 'Grocery Store I-Spy', description: 'In the store, say "I spy a yellow banana" and have them find it.', icon: 'fas fa-shopping-cart', color: 'bg-rose-600', details: ['This game turns a chore into a learning opportunity.', 'Focus on colors, shapes, and categories: "I spy something that is a red fruit." (Apple)', 'Let your child have a turn spying something for you.'] },
        
        // Social Skills
        { id: `d${day}s17`, title: 'Photo Album Tour', description: 'Look at family photos and name the people.', icon: 'fas fa-images', color: 'bg-green-600', details: ['Point to each person and say their name and relation: "This is Grandma. She is my mommy."', 'Talk about what was happening in the photo: "Here we are at the beach. It was a sunny day."'] },
        { id: `d${day}s18`, title: 'Building Block Towers', description: 'Use concepts like "on top," "under," and "next to".', icon: 'fas fa-cubes', color: 'bg-teal-600', details: ['Build a tower together.', 'Use positional words: "Let\'s put the red block on top of the blue block."', '"The tower is getting tall!"'] },
        { id: `d${day}s19`, title: 'Listen and Do', description: 'Give two-step directions to follow.', icon: 'fas fa-directions', color: 'bg-indigo-600', details: ['Start with simple one-step directions like "Get your shoes."', 'Build up to two-step directions: "First, get your shoes, then sit on the chair."', 'Make it a game to see how many steps they can remember.'] },
        { id: `d${day}s20`, title: 'Pretend Phone Calls', description: 'Use toy phones to practice conversational turns.', icon: 'fas fa-phone-alt', color: 'bg-orange-600', details: ['Pretend to call a family member like Grandma.', 'Model a simple conversation: "Hi Grandma! How are you? ... I am good. Bye-bye!"', 'Encourage your child to have a turn talking on the phone.'] },
        
        // Advanced Play
        { id: `d${day}s21`, title: 'Dress-Up Drama', description: 'Put on costumes and act out simple scenarios.', icon: 'fas fa-theater-masks', color: 'bg-purple-600', details: ['Use old clothes, hats, and scarves for costumes.', 'Pretend to be different people or animals: a doctor, a firefighter, a cat.', 'This encourages imaginative play and using new vocabulary.'] },
        { id: `d${day}s22`, title: 'Water Play', description: 'In the bath, talk about "full," "empty," "sink," and "float".', icon: 'fas fa-water', color: 'bg-yellow-700', details: ['Use cups to practice "full" and "empty."', 'Find toys that sink and toys that float.', 'Talk about the temperature: "The water feels warm."'] },
        { id: `d${day}s23`, title: 'Animal Parade', description: 'Line up toy animals and make their sounds.', icon: 'fas fa-paw', color: 'bg-pink-600', details: ['Gather all the toy animals.', 'Make a parade line and march them around the room.', 'Make each animal\'s sound as you go: "The cow says moo! The duck says quack!"'] },
        { id: `d${day}s24`, title: '"My Turn, Your Turn"', description: 'Explicitly use this phrase while playing games.', icon: 'fas fa-exchange-alt', color: 'bg-lime-700', details: ['This is a fundamental concept for conversation.', 'While playing with a toy, say "My turn to roll the ball," then "Okay, now it\'s your turn!"', 'Reinforce the concept of waiting and turn-taking.'] },

        // Creative & Outdoor
        { id: `d${day}s25`, title: 'Cloud Gazing', description: 'Lie outside and describe what shapes you see in the clouds.', icon: 'fas fa-cloud', color: 'bg-cyan-700', details: ['Find a comfy spot on the grass.', 'Look up at the clouds together.', 'Talk about what you see: "That cloud looks like a fluffy sheep." "I see a long, skinny cloud."'] },
        { id: `d${day}s26`, title: 'Junk Mail Sorting', description: 'Sort mail by size, color, or type, talking about each piece.', icon: 'fas fa-envelope-open-text', color: 'bg-fuchsia-700', details: ['Before recycling, use junk mail for a sorting activity.', 'Create piles for big envelopes and small envelopes, or for letters and flyers.', 'This teaches categorization and new vocabulary.'] },
        { id: `d${day}s27`, title: 'Tell a Simple Story', description: 'Use three pictures to tell a story.', icon: 'fas fa-book', color: 'bg-amber-800', details: ['Draw or find three pictures that show a sequence (e.g., a boy with an apple, the boy eating the apple, the apple core).', 'Arrange them in order and tell the story: "First, the boy had a big apple. Next, he ate the apple. Last, it was all gone!"'] },
        { id: `d${day}s28`, title: 'Planting a Seed', description: 'Talk through the steps of planting a seed in a small pot.', icon: 'fas fa-seedling', color: 'bg-sky-800', details: ['Gather a pot, some soil, and a large seed (like a bean).', 'Talk through each step: "First, we put the soil in the pot. Next, we make a little hole. Last, we put the seed in and cover it."'] },
        { id: `d${day}s29`, title: 'Making Music with Pots', description: 'Use wooden spoons on pots to talk about "loud" and "soft".', icon: 'fas fa-drum', color: 'bg-rose-800', details: ['Get out a few pots and pans and some wooden spoons.', 'Experiment with making loud sounds and soft sounds.', 'Create simple rhythms for your child to copy.'] },
        { id: `d${day}s30`, title: 'Celebrate Your Journey!', description: 'Review all the fun activities you did this month.', icon: 'fas fa-trophy', color: 'bg-green-800', details: ['Look back through the app at all the completed strategies.', 'Talk about your favorite activities.', 'Celebrate the progress you\'ve made together!'] },
    ];
    
    // Pick 4 unique strategies for the day based on the day number
    const startIndex = (day - 1) % (allStrategies.length - 3);
    const dailyStrategies = allStrategies.slice(startIndex, startIndex + 4).map(s => ({...s, completed: false, duration: 0 }));

    return {
      day: day,
      strategies: dailyStrategies,
    };
});


export const CHECKLIST_ITEMS: ChecklistItemData[] = [
  { id: 1, text: 'Morning hearing aid check', completed: false },
  { id: 2, text: 'Practice vowel sounds for 5 minutes', completed: false },
  { id: 3, text: 'Read one picture book together', completed: false },
  { id: 4, text: 'Narrate the bath time routine', completed: false },
  { id: 5, text: 'Sing one action song', completed: false },
  { id: 6, text: 'Practice turn-taking in a game', completed: false },
  { id: 7, text: 'Talk about feelings using pictures', completed: false },
];

const BADGE_ICONS = [
  'fas fa-seedling', 'fas fa-lightbulb', 'fas fa-music', 'fas fa-smile', 'fas fa-book-open',
  'fas fa-rocket', 'fas fa-puzzle-piece', 'fas fa-comments', 'fas fa-microphone-alt', 'fas fa-heart',
  'fas fa-cloud-sun', 'fas fa-hand-sparkles', 'fas fa-shapes', 'fas fa-palette', 'fas fa-gamepad',
  'fas fa-feather-alt', 'fas fa-leaf', 'fas fa-moon', 'fas fa-sun', 'fas fa-key',
  'fas fa-shield-alt', 'fas fa-flag', 'fas fa-award', 'fas fa-medal', 'fas fa-trophy',
  'fas fa-gem', 'fas fa-crown', 'fas fa-bolt', 'fas fa-fire', 'fas fa-star'
];

export const BADGES: Badge[] = Array.from({ length: 30 }, (_, i) => ({
    day: i + 1,
    title: `Day ${i + 1}`,
    icon: BADGE_ICONS[i],
}));

export const ARTICLES: Article[] = [
  {
    id: 1,
    title: "The Power of Reading Aloud",
    summary: "Discover how reading to your child every day, even for just a few minutes, can significantly boost their language development and listening skills.",
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1974&auto=format&fit=crop",
    content: [
      { type: 'paragraph', text: 'In the world of child development, few activities pack as much punch as the simple act of reading a story aloud. It’s a moment of connection, a gateway to new worlds, and one of the most effective tools a parent has for nurturing language and literacy skills.' },
      { type: 'heading', text: 'Building a Foundation for Language' },
      { type: 'paragraph', text: 'When you read to your child, you are exposing them to a rich and varied vocabulary they might not hear in everyday conversation. Words like "enormous," "gleaming," or "whisper" paint vivid pictures and build a vast mental dictionary. This exposure is critical for developing both receptive language (understanding words) and expressive language (using words).' },
      { type: 'paragraph', text: 'Furthermore, the rhythm, tone, and melody of your voice when reading helps children understand the nuances of language. They learn about pauses, emphasis, and emotion, which are all key components of effective communication.' },
      { type: 'heading', text: 'More Than Just Words' },
      { type: 'paragraph', text: 'Reading together also strengthens listening skills and increases attention span. In a world full of digital distractions, the focused time of a shared book is invaluable. It teaches a child to listen, to process information sequentially, and to make predictions about what might happen next—all foundational skills for academic success.' },
      { type: 'paragraph', text: 'So, pick up a book today. It doesn’t have to be long. The magic is in the consistency and the shared experience. You’re not just reading a story; you’re building a brain and nurturing a bond that will last a lifetime.' },
    ]
  },
  {
    id: 2,
    title: "Turning Playtime into Talk Time",
    summary: "Learn simple techniques to transform everyday play into powerful opportunities for language development and social interaction.",
    image: "https://images.unsplash.com/photo-1519408469219-0c5319533767?q=80&w=1780&auto=format&fit=crop",
    content: [
      { type: 'paragraph', text: 'This is a placeholder for the second article content.' }
    ]
  }
];