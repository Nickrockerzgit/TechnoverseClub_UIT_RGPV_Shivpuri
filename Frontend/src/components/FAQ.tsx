
import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQ = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [openIndex, setOpenIndex] = React.useState<number | null>(null);

  const faqs = [
    {
      question: 'How can I join Technovers?',
      answer: 'You can join Technovers by signing up on our website and attending our next orientation session. We welcome members of all skill levels!'
    },
    {
      question: 'What programming languages do you teach?',
      answer: 'We cover a wide range of languages including JavaScript, Python, Java, and more. Our courses are designed to cater to both beginners and advanced developers.'
    },
    {
      question: 'Are the courses free for members?',
      answer: 'Yes, most of our basic courses are free for members. Premium courses and workshops may have a nominal fee to cover resources and materials.'
    },
    {
      question: 'How often do you organize events?',
      answer: 'We organize events monthly, including workshops, hackathons, and tech talks. Check our events page for the latest schedule.'
    },
    {
      question: 'Can I contribute to club projects?',
      answer: "Absolutely! We encourage members to participate in our open-source projects and contribute to the club's technical initiatives."
    }
  ];

  return (
      <div className="pt-10 pb-4 sm:pb-6 lg:pb-8">    
      <div className="max-w-5xl mx-auto px-8 sm:px-10 lg:px-12"> {/* Width Increased */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          <p className="text-xl text-gray-300">
            Find answers to common questions about Technovers.
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full max-w-4xl mx-auto bg-white/5 backdrop-blur-sm rounded-lg p-6 text-left hover:bg-white/10 transition-colors"
              > {/* Max Width Increased */}
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-white">{faq.question}</h3>
                  {openIndex === index ? (
                    <ChevronUp className="h-5 w-5 text-purple-400" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-purple-400" />
                  )}
                </div>
                {openIndex === index && (
                  <p className="mt-4 text-gray-300">{faq.answer}</p>
                )}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
