const translationsEn = {
    meta: {
        title: "Alvaro Perez Portfolio",
        description: "My portfolio as a 3D Modeler and Production Lead"
    },
    nav: {
        summary: "Summary",
        aboutme: "About me",
        professional: "Professional",
        personal: "Personal",
        skills: "Skills",
        software: "Software",
        education: "Education",
        note: "Note",
        contact: "Contact"
    },
    summary: {
        quote: "\"3D modeling specialist with extensive experience in the packaging industry. Specialized in Hard Surface modeling and the development of custom methods and tools to streamline production. Passionate about exploring new opportunities and technologies, continuously learning, and deeply committed to every project I undertake.\"",
        title: "In Summary",
        p1: "To save you reading time and let you see at a glance whether my profile fits what you are looking for, here is a summary of my key skills:",
        p2: "<strong>Hard Surface & Packaging Modeling:</strong> Over 7 years of professional experience (and more than 15 since I first started in 3D) creating all types of models with millimeter accuracy, optimized meshes, and clean retopology from blueprints, images, or CAD files. Although a large part of my career has focused on the packaging industry, I fully master Hard Surface modeling for any type of product or environment.",
        p3: "<strong>Automation and Custom Tooling:</strong> I develop parametric generators using Geometry Nodes, scripts, and addons (both in Blender and standalone applications built with Qt) to eliminate repetitive tasks, cut delivery times, and speed up production.",
        p4: "<strong>Photorealistic Renders and Lighting:</strong> Drawing on my background in the audiovisual and photography sectors, I build virtual lighting setups and procedural materials to produce high-end static renders, animations, and product imagery.",
        p5: "<strong>Technical Management and Proprietary Library:</strong> Experience leading 3D production, estimating timeframes, assessing project complexity, and performing quality control. Furthermore, I hold my own library of over 1,500 packaging models I created from scratch, organized and ready to reuse to drastically reduce turnaround times.",
        p6: "If you would like to know more details about my career path, the projects I have developed, and how I acquired these skills, keep reading."
    },
    aboutme: {
        title: "About Me",
        p1: "My journey into the audiovisual world began when I was 14, when the first camera arrived at my house. I started filming skate videos and editing them, something that continued for years as I recorded every trip and filmed other skaters for video parts in collaboration with brands. This later led me to direct and edit music videos, festivals, and tours for several DJs.",
        p2: "Later, I secured a job at a military magazine where I worked for 5 years as a photographer, videographer, and video editor. It was there that I created my first 3D animation in Autodesk 3ds Max back in 2009 for the magazine's video intro. That single animation inspired me to leave the magazine and move to Barcelona to pursue a Bachelor's Degree in Audiovisual Communication at Universitat Pompeu Fabra. I chose the Interactive media track and completed an animated short film as well as a full 3D video game Demo for my Bachelor's Thesis using Maya, ZBrush, and Unity.",
        p3: "After graduating, my sole focus was to secure an internship in 3D, leaving behind my years as a videographer and editor to devote myself entirely to my true passion. It didn't take long to find an internship at the Barcelona-based company 3D Click, where I was hired right after and worked for 5 years. There, I turned professional as a 3D Modeler and Production Lead, specializing in Hard Surface modeling for packaging. I learned to model with real-world precision, perform retopology on CAD files, interpret blueprints and images, and build exact models with optimized meshes for the company's web configurators. I was also responsible for estimating timeframes, evaluating project complexity, and establishing delivery dates for clients. To optimize lead times, I began mastering technologies such as Geometry Nodes, creating procedural packaging generators so that team members without modeling knowledge could generate assets. Additionally, I wrote custom scripts and addons to address software limitations in daily tasks.",
        p4: "Following the closing of 3D Click, I was hired by the Dutch company Ovio, where I continued building upon everything I had learned, now serving as 3D Production Lead for 2 additional years until its closure. Currently, I am working as a Freelancer on platforms like Fiverr and through independent remote contracts, always seeking new opportunities to bring solutions and grow professionally."
    },
    expProf: {
        title: "Professional Experience",
        modelingTitle: "3D Modeling",
        modelingP1: "I started in the packaging sector as a traditional modeler. Packaging by packaging, I built a library while spotting patterns and structural similarities between models, an insight that later paved the way for my shift toward procedural parametric modeling.",
        modelingP2: "3D Click was my first full-time role as a 3D modeler. Over the course of 5 years, I created over 1,500 models spanning every packaging sector—a work I continued expanding at Ovio for internationally recognized clients. I learned to group, structure, and optimize assets to reuse components and drastically reduce production times.",
        libTitle: "Custom Library",
        libP1: "Expanding and systematizing this library allowed us to reuse model parts and cut design time significantly. I implemented organizational systems that made it effortless to search for and integrate full models or modular components into new projects. I currently possess a proprietary library of over 1,500 packaging models created entirely by me, covering virtually every type of container in the industry with real-world dimensions and references. Beyond daily production, our marketing team relied heavily on this library to quickly select models and request marketing renders or animated ads.",
        libP2: "Building such a vast library on my own helped me master Hard Surface modeling and develop the most efficient approach for every model, identifying unique quirks and, above all, common geometric patterns that could be fully parameterized using Geometry Nodes.",
        geoTitle: "Geometry Nodes",
        geoP1: "After modeling countless containers in Blender, I dove deep into its parametric capabilities from the very first day the Geometry Nodes tool was released in beta. Instead of modeling piece by piece or duplicating and tweaking manually, I built custom packaging generators that create fully automated 3D models from input data, generating entire product families in seconds.",
        geoP2: "I have built complete generators for paper cups, packing tapes, pouches, doypacks, pillow bags, cans, canisters, boxes, bottles, and caps from a 2D profile, alongside specialized tools designed for specific client needs.",
        geoP3: "This approach completely transformed our workflow, allowing us to produce hundreds of high-precision models with much smaller file sizes. It replaced tedious manual labor and enabled non-modeler colleagues to generate assets independently. As a result, our team's productivity increased exponentially.",
        geoP4: "I also created secondary utilities to speed up standard modeling, such as automated UV Unwrap tools that center and square up meshes—critical for labels and artwork areas—as well as parametric thread and counter-thread generators, among others. Whenever I spot a repetitive task, I look for a way to parameterize it or solve it through an addon or script.",
        addonsTitle: "Addons and Scripts",
        addonsP1: "When a problem goes beyond standard Blender parameterization or requires lower-level access to the software, I turn to programming. If a script evolves into a recurring utility, I convert it into a full Addon with its own custom interface.",
        addonsP2: "I have written more scripts than I can list to accelerate long, repetitive tasks, such as bulk-exporting collections or managing asset libraries. Some of the most notable addons I have programmed include:",
        addon1: "<strong>Asset Batch Manager:</strong> Moves assets between catalogs, tags them, and batch-renames both assets and source files, bypassing Blender's manual requirement of opening files one by one.",
        addon2: "<strong>GLTF Export:</strong> Automatically exports all collections from a .blend file into standalone .glb formats, applying custom settings configured directly in the addon interface.",
        addon3: "<strong>Texture Compressor:</strong> Optimizes the file size of textures generated after baking while maintaining visual fidelity.",
        compressorTitle: "Texture Compressor",
        appP1: "I also developed a standalone application in Qt (whose initial version was for the web) designed so anyone can render without needing to open Blender. The app leverages Blender in the background but offers its own independent interface.",
        appP2: "Among its key features, it allows users to generate GS1-compliant images or 360º animations, select lighting profiles, camera focal length, and switch between transparent or white backgrounds. Under the hood, it features a parametric studio built with Geometry Nodes that automatically calculates distance to any product and is completely configurable for new light presets, camera angles, etc.",
        appP3: "It supports importing .blend and .glb files, with .blend being the most flexible as the app reads its Geometry Nodes modifiers. This allows users to tweak product parts, adjust materials, or swap label textures instantly. It supports both single and batch rendering, applying identical configurations across multiple files simultaneously."
    },
    expPers: {
        title: "Personal Experience",
        intro: "My personal experience is closely tied to my professional work, as 3D plays a major role in my life. Any technical curiosities that I cannot explore in my day-to-day job end up becoming personal projects. Many of them reinforce my professional work, while others are completely unrelated, but all of them help me continue growing.",
        geoTitle: "Geometry Nodes in Game Development",
        geoP1: "This project was born when I set out to recreate my childhood hometown to scale in Unreal Engine so I could walk through it. That led me to ask how to generate towns on a large scale without manually placing every house, road, streetlamp, or urban prop. Right around that time, I started learning Geometry Nodes for work, but I used this personal project as a sandbox to learn the tool on an exciting personal endeavor outside work hours. After a year of learning, I developed the foundation of a procedural city generator, this time implementing it within the Godot engine. This project allowed me to explore the tool deeply, and once I grasped its potential, new ideas for applying Geometry Nodes to packaging production never stopped coming.",
        assetsTitle: "Assets",
        assetsP1: "My passion for 3D and game development keeps me constantly active. I mostly model environment assets, renders, occasional custom furniture for individuals, and, to a lesser extent, parts for 3D printing. I craft all these models using real-world measurements, optimized meshes, and the exact same attention to detail as in my professional work. Additionally, I occasionally do organic modeling to sculpt characters and test them in game engines—projects that reinforce skills not typically demanded in my daily routine.",
        enginesTitle: "Game Engines",
        enginesP1: "Alongside modeling, my other main passion is game engines, mainly because of the interactivity they offer. My first hands-on experience was with Unity for my <a href=\"https://nakez.itch.io/cryptophasia\" target=\"_blank\" rel=\"noopener noreferrer\">Bachelor's Thesis Demo</a>, but I spent the most time in Unreal Engine, bringing characters and environments to life using Blueprints.",
        enginesP2: "However, when I started working with Geometry Nodes, I discovered Godot, and just like with Blender, I fell in love with its potential and flexibility. It is currently my primary engine for all personal projects.",
        aiTitle: "Artificial Intelligence as a Tool:",
        aiP1: "I have talked a lot about developing applications, scripts, and addons, so it is time to unveil the curtain. I am not a developer by trade, although I have been a tech enthusiast since getting my first computer in 1995, even working professionally in IT for a period. I have used Windows, macOS, and Linux, with the latter being my main OS for years. I am passionate about computing, and part of my hobby includes deploying self-hosted applications via Docker Compose on my home server—something I was doing long before AI arrived.",
        aiP2: "However, the rise of AI gave me the opportunity to build solutions I could previously only imagine. I primarily use it to write scripts, addons, and software tools like the ones mentioned above, though I have also built projects for Android, Tauri, and web configurators. On a personal level, I rely on it constantly for everything from small Linux utilities to complex software setups. I always keep up with technological advancements and adopt them whenever they streamline my workflow, but so far I have not used AI to generate 3D models or renders. As of today, it remains far from meeting the quality, technical precision, and topological control required by the industry, so I integrate it purely as a productivity tool to optimize workflows without ever compromising final quality."
    },
    skills: {
        title: "Skills",
        prodTitle: "In Production",
        prodP1: "<strong>Project Evaluation & Planning:</strong> As Production Lead, I evaluate the product to be digitized, assess its complexity, calculate realistic delivery timeframes, and design the ideal production strategy to execute it.",
        prodP2: "<strong>Methodology Adapted to Complexity:</strong> I analyze each asset's technical requirements beforehand to select the most effective modeling or parameterization technique, ensuring a seamless pipeline and strict deadline compliance.",
        prodP3: "<strong>Innovation & Scalability:</strong> I continuously explore ways to optimize and scale workflows. I design tools and methods that save time for the entire team while maintaining high technical standards.",
        prodP4: "<strong>Quality Control:</strong> I rigorously inspect every production phase to ensure deliverables meet required specifications prior to final handoff.",
        prodP5: "<strong>Asset Management & Organization:</strong> I keep project files structured, organized in accessible asset libraries, and backed up regularly so assets remain production-ready for future updates.",
        modelingTitle: "In Modeling & Technical Pipeline",
        modelingP1: "<strong>Hard Surface Modeling:</strong> The core pillar of my daily work. I specialize in creating clean, optimized meshes, interpreting blueprints and reference images, and performing precise retopology from CAD data.",
        modelingP2: "<strong>Shaders & Procedural Materials:</strong> I approach texturing procedurally, though I also utilize Substance Painter, ArmorPaint, or Blender when conventional texturing and texture baking are required for final delivery.",
        modelingP3: "<strong>UV Mapping & Optimization:</strong> Because packaging demands exact placement of artwork, labels, and special finishes, I specialize in clean UV unwrapping. I also build custom tools and scripts to automatically center, square up, and pack UV islands efficiently.",
        modelingP4: "<strong>Lighting & Composition:</strong> I apply over 15 years of photography expertise to virtual environments, crafting lighting setups and camera compositions that bring photorealism to digital products.",
        modelingP5: "<strong>Rendering & Automation:</strong> I fine-tune render engine settings to minimize render times without sacrificing visual fidelity, pairing it with custom external apps and procedural studio rigs for batch processing.",
        modelingP6: "<strong>Animation:</strong> Focused on commercial product presentation, generating promotional assets, marketing clips, mailings, or 360º interactive views."
    },
    softwares: {
        title: "Software"
    },
    education: {
        title: "Education",
        degree: "Bachelor's Degree in Audiovisual Communication (Interactive Media Specialization) | Universitat Pompeu Fabra (2014 - 2018)"
    },
    note: {
        title: "Final Note",
        p1: "I have many interests and projects, so I tried to streamline this summary as much as possible to keep it concise.",
        p2: "On another note, having been continuously employed over the years meant I rarely had to worry about maintaining an updated CV or displaying my portfolio publicly. Furthermore, due to non-disclosure agreements (NDAs), I am unable to publicly showcase some of my best work, and my personal projects were mostly stored for personal archiving rather than display—something I am gradually improving.",
        p3: "Because of this, if you would like to know more about my workflow or have any questions regarding a project, please feel free to reach out. I am currently available for freelance collaborations as well as full-time team positions."
    },
    contact: {
        title: "Contact"
    }
};