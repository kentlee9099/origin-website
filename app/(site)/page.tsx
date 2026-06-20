import { Hero }                from '@/components/sections/Hero'
import { AboutSection }        from '@/components/sections/AboutSection'
import { ServicesSection }     from '@/components/sections/ServicesSection'
import { ProjectGrid }         from '@/components/sections/ProjectGrid'
import { EditorialSection }    from '@/components/sections/EditorialSection'
import { TestimonialsSection } from '@/components/sections/TestimonialsSection'
import { CTASection }          from '@/components/sections/CTASection'
import {
  getHeroContent, getAboutContent, getServices,
  getCases, getInsights, getTestimonials, getCtaContent,
} from '@/lib/data'

export default async function Home() {
  const [hero, about, services, cases, insights, testimonials, cta] = await Promise.all([
    getHeroContent(), getAboutContent(), getServices(),
    getCases(), getInsights(), getTestimonials(), getCtaContent(),
  ])
  return (
    <>
      {hero          && <Hero data={hero} />}
      {about.content && <AboutSection content={about.content} features={about.features} />}
      {services.length > 0     && <ServicesSection items={services} />}
      {cases.length > 0        && <ProjectGrid items={cases} />}
      {insights.length > 0     && <EditorialSection items={insights} />}
      {testimonials.length > 0 && <TestimonialsSection items={testimonials} />}
      {cta           && <CTASection data={cta} />}
    </>
  )
}
