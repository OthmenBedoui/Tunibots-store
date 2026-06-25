import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useBlogPost } from '../data/queries/storeQueries';
import { Calendar, User, ArrowLeft, Clock, Tag, MessageSquareShare } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Card, CardContent } from '../../components/ui/card';

export const BlogPostDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const { data: post, isLoading, isError } = useBlogPost(slug || '');

  const renderMarkdown = (bodyText: string) => {
    const lines = bodyText.split('\n');
    let inList = false;
    const elements: React.ReactNode[] = [];

    lines.forEach((line, idx) => {
      const trimmed = line.trim();

      if (trimmed.startsWith('# ')) {
        elements.push(
          <h1 key={`h1-${idx}`} className="font-display text-2xl md:text-3xl font-black text-white mt-8 mb-4 leading-tight">
            {trimmed.substring(2)}
          </h1>
        );
      } else if (trimmed.startsWith('## ')) {
        elements.push(
          <h2 key={`h2-${idx}`} className="font-display text-lg md:text-xl font-bold text-orange-500 mt-6 mb-3 border-l-2 border-orange-500 pl-3">
            {trimmed.substring(3)}
          </h2>
        );
      } else if (trimmed.startsWith('### ')) {
        elements.push(
          <h3 key={`h3-${idx}`} className="font-display text-base md:text-lg font-bold text-white mt-4 mb-2">
            {trimmed.substring(4)}
          </h3>
        );
      } else if (trimmed.startsWith('- ')) {
        elements.push(
          <li key={`li-${idx}`} className="text-xs sm:text-sm text-neutral-300 ml-4 list-disc list-inside mb-2 leading-relaxed">
            {trimmed.substring(2)}
          </li>
        );
      } else if (trimmed === '') {
        elements.push(<div key={`br-${idx}`} className="h-2" />);
      } else {
        // Simple formatter for strong text e.g. **text**
        let rawText = trimmed;
        const boldRegex = /\*\*(.*?)\*\*/g;
        const parts = [];
        let lastIndex = 0;
        let match;

        while ((match = boldRegex.exec(rawText)) !== null) {
          if (match.index > lastIndex) {
            parts.push(rawText.substring(lastIndex, match.index));
          }
          parts.push(<strong key={match.index} className="text-orange-500 font-extrabold">{match[1]}</strong>);
          lastIndex = boldRegex.lastIndex;
        }

        if (lastIndex < rawText.length) {
          parts.push(rawText.substring(lastIndex));
        }

        elements.push(
          <p key={`p-${idx}`} className="text-xs sm:text-sm text-neutral-300 leading-relaxed mb-4">
            {parts.length > 0 ? parts : rawText}
          </p>
        );
      }
    });

    return elements;
  };

  if (isLoading) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8 space-y-8 animate-pulse">
        <div className="h-6 w-32 bg-neutral-800 rounded"></div>
        <div className="h-10 w-full bg-neutral-800 rounded"></div>
        <div className="aspect-video bg-neutral-800 rounded-xl"></div>
        <div className="h-64 w-full bg-neutral-800 rounded"></div>
      </div>
    );
  }

  if (isError || !post) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center space-y-4">
        <h2 className="font-display text-xl font-bold text-white">Article Introuvable</h2>
        <p className="text-xs text-neutral-500">
          Désolé, l'article demandé n'existe pas ou a été retiré.
        </p>
        <Button onClick={() => navigate('/blog')} className="bg-orange-500 hover:bg-orange-600 text-white font-bold rounded">
          Retourner au blog
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      
      {/* Back button */}
      <button
        onClick={() => navigate('/blog')}
        className="inline-flex items-center space-x-2 text-xs font-bold text-neutral-400 hover:text-orange-500 mb-6 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Retour au blog</span>
      </button>

      <article className="space-y-8">
        
        {/* Header Title block */}
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Badge key={tag} className="bg-orange-500/10 text-orange-500 hover:bg-orange-500/10 border-none px-2.5 py-0.5 rounded text-[10px] font-bold font-mono">
                {tag}
              </Badge>
            ))}
          </div>

          <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-tight tracking-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 pt-2 border-b border-white/5 pb-4 text-xs text-neutral-500 font-mono">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5 text-orange-500" />
              {new Date(post.publishedAt || '').toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
            </span>
            <span className="flex items-center gap-1.5">
              <User className="h-3.5 w-3.5 text-orange-500" />
              Rédacteur TUNIBOTS
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-orange-500" />
              4 min de lecture
            </span>
          </div>
        </div>

        {/* Cover Photo */}
        {post.coverImage && (
          <div className="aspect-video w-full rounded-2xl overflow-hidden bg-neutral-900 border border-white/5">
            <img src={post.coverImage} alt={post.title} className="h-full w-full object-cover" />
          </div>
        )}

        {/* Article Body Content */}
        <div className="prose prose-invert max-w-none">
          {renderMarkdown(String(post.body))}
        </div>

        {/* Bottom CTA block */}
        <Card className="bg-orange-500/10 border-orange-500/20 rounded-xl p-6 mt-12">
          <CardContent className="p-0 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center md:text-left">
              <h4 className="font-display text-sm font-bold text-white uppercase tracking-wider">Besoin d'un produit ?</h4>
              <p className="text-xs text-neutral-400 max-w-sm">
                Retrouvez toutes nos licences officielles et comptes premium livrés en 15 minutes sur notre boutique.
              </p>
            </div>
            <Button
              onClick={() => navigate('/produits')}
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 h-10 rounded shadow-md shadow-orange-500/10"
            >
              Parcourir la Boutique
            </Button>
          </CardContent>
        </Card>

      </article>

    </div>
  );
};
