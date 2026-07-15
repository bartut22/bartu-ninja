'use client'

import dynamic from 'next/dynamic';

const ProjectsCarousel = dynamic(() => import('./projectsCarousel.js'), { ssr: false });

export default ProjectsCarousel;