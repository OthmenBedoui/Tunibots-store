import React from 'react';
import { Link } from 'react-router-dom';
import { useBlogPosts } from '../data/queries/storeQueries';
import { Calendar, User, ArrowRight, Tag, BookOpen } from 'lucide-react';
import { Card, CardContent } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { motion } from 'motion/react';

export const Blog: React.FC = () => {
  const { data: posts, isLoading } = useBlogPosts();

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-10">
      
      {/* Title block */}
      <div className="text-center space-y-3 max-w-xl mx-auto">
        <Badge className="bg-orange-500/10 text-orange-500 hover:bg-orange-500/10 font-bold border-none px-3 py-1 rounded">
          Le Blog de TUNIBOTS
        </Badge>
        <h1 className="font-display text-3xl font-black text-white tracking-tight sm:text-4xl">
          GUIDES, TUTO & <span className="text-orange-500">ACTUALITÉS</span>
        </h1>
        <p className="text-xs text-neutral-400 leading-relaxed">
          Retrouvez nos analyses détaillées d'outils d'intelligence artificielle, tutoriels d'activation de jeux et conseils de pro pour sécuriser vos comptes.
        </p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {Array.from({ length: 2 }).map((_, idx) => (
            <div key={idx} className="flex flex-col rounded-xl border border-white/5 bg-neutral-900 p-4 space-y-4 animate-pulse">
              <div className="aspect-video bg-neutral-800 rounded-lg"></div>
              <div className="h-4 w-3/4 bg-neutral-800 rounded"></div>
              <div className="h-3 w-1/2 bg-neutral-800 rounded"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {posts?.map((post) => (
            <motion.div
              key={post.id}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="flex flex-col overflow-hidden rounded-xl border border-white/5 bg-neutral-900/30 transition-all hover:border-orange-500/20 hover:shadow-lg hover:shadow-orange-500/5"
            >
              <Link to={`/blog/${post.slug}`} className="flex flex-col h-full">
                {/* Cover Photo */}
                {post.coverImage && (
                  <div className="aspect-video w-full overflow-hidden bg-neutral-800 relative">
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute bottom-4 left-4 flex gap-1.5 flex-wrap">
                      {post.tags.slice(0, 2).map((tag) => (
                        <span key={tag} className="text-[9px] font-bold text-white bg-orange-500 px-2 py-0.5 rounded font-mono uppercase">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Content info */}
                <div className="p-6 flex flex-1 flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-4 text-[10px] text-neutral-500 font-mono">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5 text-orange-500" />
                        {new Date(post.publishedAt || '').toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                      </span>
                      <span className="flex items-center gap-1">
                        <User className="h-3.5 w-3.5 text-orange-500" />
                        Rédacteur TUNIBOTS
                      </span>
                    </div>

                    <h2 className="font-display text-base font-black text-white hover:text-orange-500 transition-colors line-clamp-2">
                      {post.title}
                    </h2>

                    {post.excerpt && (
                      <p className="text-xs text-neutral-400 leading-relaxed line-clamp-3">
                        {post.excerpt}
                      </p>
                    )}
                  </div>

                  <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs">
                    <span className="text-orange-500 font-bold flex items-center gap-1.5 group-hover:text-orange-400">
                      Lire l'article complet <ArrowRight className="h-4 w-4" />
                    </span>
                    <span className="text-[10px] text-neutral-500 font-mono flex items-center gap-1">
                      <BookOpen className="h-3 w-3" /> 4 min de lecture
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      )}

    </div>
  );
};
