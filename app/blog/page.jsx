import { blogPosts } from '@/data/blogPosts'
import Link from 'next/link'

export default function BlogPage() {
  const categories = [...new Set(blogPosts.map(function(post) { return post.category }))]

  return (
    <div>
      <section style={{
        background: 'var(--cream)',
        padding: '80px 24px 60px',
        borderBottom: '1px solid var(--border)',
      }}>
        <div style={{ maxWidth: 'var(--container-width)', margin: '0 auto' }}>
          <p style={{
            fontSize: '0.75rem',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            color: 'var(--text-muted)',
            marginBottom: '16px',
          }}>
            Real Estate Insights
          </p>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '2.5rem',
            marginBottom: '16px',
          }}>
            Property <em>Blog</em>
          </h1>
          <p style={{ fontSize: '1rem', color: 'var(--text-muted)', maxWidth: '600px', lineHeight: 1.7 }}>
            Expert advice, market insights, and tips for buying and selling property in Kenya.
          </p>
        </div>
      </section>

      <section style={{ padding: '80px 24px', background: 'var(--white)' }}>
        <div style={{ maxWidth: 'var(--container-width)', margin: '0 auto' }}>
          <div style={{ marginBottom: '48px' }}>
            <h2 style={{ marginBottom: '24px' }}>Latest Articles</h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '32px',
            }}>
              {blogPosts.map(function(post) {
                return (
                  <Link key={post.id} href={`/blog/${post.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div style={{
                      background: 'var(--cream)',
                      border: '1px solid var(--border)',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      transition: 'transform 0.2s',
                    }}>
                      <img
                        src={post.image}
                        alt={post.title}
                        style={{
                          width: '100%',
                          height: '200px',
                          objectFit: 'cover',
                        }}
                      />
                      <div style={{ padding: '24px' }}>
                        <div style={{ marginBottom: '12px' }}>
                          <span style={{
                            background: 'var(--olive)',
                            color: 'var(--cream)',
                            padding: '4px 10px',
                            fontSize: '0.7rem',
                            borderRadius: '4px',
                            fontWeight: 500,
                          }}>
                            {post.category}
                          </span>
                        </div>
                        <h3 style={{
                          fontSize: '1.1rem',
                          marginBottom: '12px',
                          fontFamily: 'var(--font-display)',
                        }}>
                          {post.title}
                        </h3>
                        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '16px' }}>
                          {post.excerpt}
                        </p>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                          <span>{post.author}</span>
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>

          <div>
            <h2 style={{ marginBottom: '24px' }}>Browse by Category</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
              {categories.map(function(category) {
                return (
                  <button
                    key={category}
                    style={{
                      padding: '10px 20px',
                      border: '1px solid var(--border)',
                      background: 'transparent',
                      color: 'var(--text-muted)',
                      fontSize: '0.9rem',
                      cursor: 'pointer',
                      borderRadius: '4px',
                    }}
                  >
                    {category}
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}