
function hubApp() {
    return {
        activeTab: 'home',
        isMenuOpen: false,
        isQuizOpen: false,
        quizStep: 0,
        quizAnswers: [],
        quizResult: null,

        tabs: [
            { id: 'home', name: 'Home' },
            { id: 'lab', name: 'Discovery Lab' },
            { id: 'coaching', name: 'Coaching' }
        ],

        assessments: [
            { id: 'core-values', title: "Core Values", description: "Identify the principles that drive your decisions.", duration: "10m", category: "Identity" },
            { id: 'friction-flow', title: "Friction vs. Flow", description: "Measure life resistance and find your ease.", duration: "5m", category: "Productivity" },
            { id: 'emotional-baseline', title: "Emotional Baseline", description: "Understand your default resilience states.", duration: "12m", category: "Wellness" }
        ],

        quizQuestions: [
            { text: "I often feel like I am fighting against my natural rhythm." },
            { text: "My daily tasks align closely with my long-term values." },
            { text: "I frequently experience 'decision fatigue' early in the day." },
            { text: "Unexpected schedule changes cause significant stress." },
            { text: "I spend more time fixing past mistakes than planning future growth." }
        ],

        openQuiz() {
            this.isQuizOpen = true;
            this.resetQuiz();
        },

        resetQuiz() {
            this.quizStep = 0;
            this.quizAnswers = [];
            this.quizResult = null;
        },

        handleQuizAnswer(val) {
            this.quizAnswers.push(val);
            if (this.quizStep < this.quizQuestions.length - 1) {
                this.quizStep++;
            } else {
                this.calculateResult();
            }
        },

        calculateResult() {
            const total = this.quizAnswers.reduce((a, b) => a + b, 0);
            if (total <= 10) this.quizResult = 'Essentialist';
            else if (total <= 18) this.quizResult = 'Balanced';
            else this.quizResult = 'Friction Seeker';
        },

        getResultDescription() {
            const descriptions = {
                'Essentialist': "You've mastered focus. Your life is characterized by high alignment and minimal resistance.",
                'Balanced': "You have a solid foundation, but some areas of friction drain your energy unnecessarily.",
                'Friction Seeker': "You are operating at high resistance. This often leads to burnout. It's time to simplify."
            };
            return descriptions[this.quizResult] || "";
        },

        scrollToContact() {
            this.$nextTick(() => {
                const el = document.getElementById('contact-form');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
            });
        }
    }
}
