<template>
	<SectionTitle title="Contacts" />
	<section class="contact-container">
		<ContactCard v-for="contact in contactSections" :key="contact.title" :contact="contact" />
	</section>

	<SectionTitle title="Skills" />
	<div id="hoverOverlay"></div>
	<section class="skills-section">
		<SkillCard v-for="skill in skills" :key="skill.displayName" :skill="skill" />
	</section>

	<SectionTitle title="Projects" />
	<section class="content-sections">
		<SectionBlock v-for="section in projectSections" :key="section.title" :section="section" />
	</section>
</template>

<script>
import { ref } from "vue";
import SkillCard from "./components/SkillCard.vue";
import SectionBlock from "./components/SectionBlock.vue";
import SectionTitle from "./components/SectionTitle.vue";
import ContactCard from "./components/ContactCard.vue";

export default {
	components: { SkillCard, SectionBlock, SectionTitle, ContactCard },
	setup() {
		const contactSections = ref([
			{
				title: "Email",
				content: "<p><a href='mailto:dxcrcc@rit.edu'>dxcrcc@rit.edu</a></p>",
			},
			{
				title: "LinkedIn",
				content:
					"<p><a href='https://www.linkedin.com/in/DavidArthurCole/'>DavidArthurCole</a></p>",
			},
			{
				title: "GitHub",
				content:
					"<p><a href='https://github.com/DavidArthurCole'>DavidArthurCole</a></p>",
			},
		]);

		const skills = ref([
			{
				displayName: "Vue.js",
				description: "JS Framework this site runs on!",
				hoverColor: "rgba(51, 73, 93, 0.5)",
				image: "/images/vue.png",
				link: "https://vuejs.org/",
			},
			{
				displayName: "Java",
				description: "Experience with modding, game development, CLI apps, and more.",
				hoverColor: "rgba(64, 104, 147, 0.5)",
				image: "/images/java.png",
				link: "https://www.oracle.com/java/",
			},
			{
				displayName: "Node JS",
				description: "Web-server and scripting development.",
				hoverColor: "rgba(98, 175, 76, 0.5)",
				image: "/images/node.png",
				link: "https://nodejs.org/en/",
			},

			{
				displayName: "ServiceNow",
				description: "ITSM Administration & Development",
				hoverColor: "rgba(3, 45, 67, 0.5)",
				image: "/images/servicenow.png",
				link: "https://www.servicenow.com/company.html",
			},
			{
				displayName: "Docker",
				description: "Containerization and orchestration.",
				hoverColor: "rgba(30, 99, 238, 0.5)",
				image: "/images/docker.png",
				link: "https://www.docker.com/",
			},
			{
				displayName: "Linux",
				description: "Kernel and OS experience with Ubuntu, Mint, and Arch.",
				hoverColor: "rgba(50, 9, 39, 0.5)",
				image: "/images/linux.png",
				link: "https://www.linuxfoundation.org/",
			},
		]);

		const projectSections = ref([
			{
				title: "auto-dymo",
				link: "https://github.com/davidArthurCole/auto-dymo",
				content: "A Node JS server allowing for printing of DYMO labels over the web.",
			},
			{
				title: "EggIncProtoExtractor",
				link: "https://github.com/DavidArthurCole/EggIncProtoExtractor",
				content: "Uses Python & <a href='https://protobuf.dev/' target='_blank' rel='noopener noreferrer'>protobuf</a> to extract and decompile the Egg Inc. game files into a useable format.",
			},
			{
				title: "File Sorter",
				link: "https://github.com/DavidArthurCole/Sorter",
				content: "I developed this C++ executable to help organize files after data recovery.",
			},
		]);

		return {
			contactSections,
			skills,
			projectSections,
		};
	},
};
</script>

<style scoped>
.app-container {
	height: 100vh;
	overflow-y: scroll;
	background: linear-gradient(to bottom, #333333 0%, #330000 100%);
	background-size: 100% 200%;
	background-attachment: local;
	overflow-y: auto;
	background: linear-gradient(to bottom, #1a1a1a 0%, #4b0000 100%);
	background-size: 100% 200%;
	background-attachment: scroll;
}

.skills-section {
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	gap: 1rem;
	width: 60%;
	margin: 0 auto;
	padding: 1rem 0;
}

.content-sections {
	width: 60%;
	margin: 0 auto;
	padding: 1rem 0;
}

.contact-container {
	display: flex;
	justify-content: space-between;
	gap: 1rem;
	width: 60%;
	margin: 2rem auto;
	padding: 0;
}

@media (max-width: 480px) {
	.skills-section {
		width: 95% !important;
		gap: 0.5rem;
	}

	.skill-card {
		width: 100% !important;
		padding: 0.5rem !important;
	}

	.skill-image {
		max-height: 60px !important;
	}

	.skill-text a {
		font-size: 1rem !important;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.contact-container {
		flex-direction: column !important;
		width: 95% !important;
	}

	.contact-card {
		width: 100% !important;
		margin: 0 !important;
	}

	.content-sections {
		width: 95% !important;
	}

	.section-block {
		width: 100% !important;
	}
}

@media (min-width: 481px) and (max-width: 767px) {
	.skills-section {
		width: 90% !important;
	}

	.skill-card {
		width: calc((100% - 1rem) / 2) !important;
	}

	.contact-container {
		flex-wrap: wrap;
		width: 90% !important;
	}

	.contact-card {
		width: calc((100% - 1rem) / 2) !important;
		margin: 0 !important;
	}

	.content-sections {
		width: calc((100% - 1rem) / 2) !important;
	}

	.section-block {
		width: 100% !important;
	}
}

@media (min-width: 768px) and (max-width: 1024px) {
	.skills-section {
		width: 80% !important;
	}

	.skill-card {
		width: calc((100% - 2rem) / 3) !important;
	}

	.contact-container {
		flex-wrap: wrap;
		width: 80% !important;
	}

	.contact-card {
		width: calc((100% - 2rem) / 3) !important;
		margin: 0 !important;
	}

	.content-sections {
		width: calc((100% - 2rem) / 3) !important;
	}

	.section-block {
		width: 100% !important;
	}
}

@media (min-width: 1025px) {
	.skills-section {
		width: 60% !important;
	}

	.skill-card {
		width: calc((100% - 2rem) / 3) !important;
	}

	.contact-container {
		width: 60% !important;
	}

	.contact-card {
		width: auto;
	}

	.content-sections {
		width: 60% !important;
	}

	.section-block {
		width: 100% !important;
	}
}
</style>
