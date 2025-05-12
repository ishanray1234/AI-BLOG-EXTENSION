from flask import Flask, request, jsonify
from transformers import GPT2LMHeadModel, GPT2Tokenizer
import torch
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allow cross-origin requests from React frontend

# Load model and tokenizer
model = GPT2LMHeadModel.from_pretrained("./fine_tuned_model")
tokenizer = GPT2Tokenizer.from_pretrained("./fine_tuned_model")
tokenizer.pad_token = tokenizer.eos_token
model.eval()

@app.route("/generate", methods=["POST"])
def generate_blog():
    data = request.get_json()
    print(f"Received data: {data}")
    form = data.get("formData", {})

    title = form.get("title", "")
    keywords = form.get("keywords", [])
    background = form.get("background", "")
    style = form.get("style", "")
    word_count = form.get("wordCount", 300)

    keywords_str = ", ".join(keywords) if isinstance(keywords, list) else keywords

    # Generate Introduction
    intro_prompt = (
        f"Write an engaging introduction paragraph for a blog titled '{title}' "
        f"using a {style} tone. Include relevant context about {background} and "
        f"focus on these keywords: {keywords_str}.\n\nIntroduction:"
    )
    print("Intro Prompt:", intro_prompt)

    intro_ids = tokenizer(intro_prompt, return_tensors="pt").input_ids
    intro_output = model.generate(
        intro_ids,
        max_length=60 + (word_count // 5),
        pad_token_id=tokenizer.eos_token_id,
        do_sample=True,
        top_p=0.9,
        temperature=0.8,
        repetition_penalty=1.2
    )
    introduction = tokenizer.decode(intro_output[0], skip_special_tokens=True).replace(intro_prompt, "").strip()

    # Generate Body
    body_prompt = (
        f"Expand the following blog introduction into a detailed blog body. "
        f"Use a {style} tone. Include analysis, examples, and in-depth information.\n\n"
        f"Introduction: {introduction}\n\nBody:"
    )
    print("Body Prompt:", body_prompt)

    body_ids = tokenizer(body_prompt, return_tensors="pt").input_ids
    body_output = model.generate(
        body_ids,
        max_length=60 + (word_count),
        pad_token_id=tokenizer.eos_token_id,
        do_sample=True,
        top_p=0.9,
        temperature=0.7,
        repetition_penalty=1.2
    )
    body = tokenizer.decode(body_output[0], skip_special_tokens=True).replace(body_prompt, "").strip()

    # Generate Meta Description
    meta_prompt = (
        f"Write a concise meta description (under 160 characters) for the blog titled '{title}'.\n\n"
        f"Content: {introduction} {body}\n\nMeta Description:"
    )
    print("Meta Prompt:", meta_prompt)

    meta_ids = tokenizer(meta_prompt, return_tensors="pt").input_ids
    meta_output = model.generate(
        meta_ids,
        max_length=1.5*word_count,
        pad_token_id=tokenizer.eos_token_id,
        do_sample=True,
        top_p=0.9,
        temperature=0.7,
        repetition_penalty=1.2
    )
    meta_description = tokenizer.decode(meta_output[0], skip_special_tokens=True).replace(meta_prompt, "").strip()

    blog = f"# {title}\n\n## Introduction\n{introduction}\n\n## Body\n{body}\n\n---\n**Meta Description:  {meta_description}"
    print("Generated Blog:", blog)

    return jsonify({"blog": blog})
