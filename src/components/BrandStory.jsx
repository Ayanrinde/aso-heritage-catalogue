import { site } from '../config/site.js';

export default function BrandStory() {
  const { heading, paragraphs, values } = site.story;

  return (
    <section id="story" aria-labelledby="story-heading" className="py-20 sm:py-28">
      <div className="wrap grid gap-14 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
        <div>
          <h2 id="story-heading" className="max-w-xl text-3xl font-extrabold leading-tight tracking-tight text-indigo sm:text-5xl">
            {heading}
          </h2>
          <div className="mt-8 max-w-[62ch] space-y-5 text-lg">
            {paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>

        <ul className="self-end border-t border-mist">
          {values.map((value) => (
            <li key={value.title} className="border-b border-mist py-6">
              <h3 className="font-display text-xl font-bold text-indigo">{value.title}</h3>
              <p className="mt-2 max-w-md text-base text-indigo-deep/85">{value.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
