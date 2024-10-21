from flask import Flask, render_template, request

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('exam.html')  # Render the HTML file

@app.route('/submit', methods=['POST'])
def submit():
    # Retrieve form data
    answers = {
        'q1': request.form.get('q1'),
        'q2': request.form.get('q2'),
        'q3': request.form.get('q3'),
    }
    
    # Process the answers (for example, check correctness)
    score = 0
    correct_answers = {'q1': 'c', 'q2': 'b', 'q3': 'b'}  # Example correct answers
    
    for question, answer in answers.items():
        if answer == correct_answers.get(question):
            score += 1
            
    return f'Your score is: {score}/{len(correct_answers)}'

if __name__ == '__main__':
    app.run(debug=True)